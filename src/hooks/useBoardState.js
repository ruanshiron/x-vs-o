import React, { useState, useEffect, useContext } from 'react'
import { firestore } from '../firebase'
import { won } from '../util'
import { UserContext } from '../contexts/UserContextProvider'
import { Modal } from 'antd'
import { SmileTwoTone, MehTwoTone } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

// TODO: Firebase here 

function deepClone(array) {
  return JSON.parse(JSON.stringify(array))
}

function init_board() {
  const SIZE = 15
  let r = []
  for (let i = 0; i < SIZE; i++) {
    r.push(Array(SIZE).fill(null))
  }
  return r
}

function useBoardState(match) {

  const history = useHistory()
  const [board, setBoard] = useState(init_board())
  const { signedInUser } = useContext(UserContext)
  const mark = match.users.indexOf(signedInUser.uid)
  const [isYourTurn, setIsYourTurn] = useState(match.turn === mark)
  const matchRef = firestore.collection("matches").doc(match.id)
  const [gameover, setGameover] = useState(false)
  const onTimeoutTurn = () => {
    let winner = isYourTurn? 1 - mark: mark

    setGameover(true)

    firestore.runTransaction((transaction) => {
      return transaction.get(matchRef).then((match) => {
        const matchData = match.data()
        if (matchData.winner === -1)
          transaction.update(matchRef, { winner: winner })

        return `We have winner!`
      })
    }).then((r) => {
      console.log(r)
    }).catch((err) => {
      console.error(err)
    })
  }
  const [timeOnBar, setTimeOnBar] = useState(15000)
  const [timer, setTimer] = useState()
  const [repeat, setRepeat] = useState()
  useEffect(() => {

    const unsubscribe = matchRef.onSnapshot((doc) => {
      const { board, turn, winner } = doc.data()

      if (board) setBoard(JSON.parse(board))
      if (turn === mark) setIsYourTurn(true)

      if (winner !== -1) {
        setGameover(true)
        if (timer) clearTimeout(timer)
        if (repeat) clearInterval(repeat)

        const promt = winner === mark ?
          { title: '勝利', message: '最高です！', icon: <SmileTwoTone /> }
          :
          { title: '敗北', message: '次の対戦に頑張りましょう！', icon: <MehTwoTone /> }
        
        UpdateHistoryToFirebase(doc.data())
          .then((r) => {
            console.log(r);
            
            Modal.confirm({
              title: promt.title,
              content: promt.message,
              icon: promt.icon,
              cancelText: '留まる',
              okText: '離れる',
              onOk: () => history.replace('/')
            })

            unsubscribe()
          })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTimeOnBar(15000)
    if (timer) clearTimeout(timer)
    if (repeat) clearInterval(repeat)
    setTimer(setTimeout(onTimeoutTurn, 15000))
    setRepeat(setInterval(() => setTimeOnBar(t => t - 1000), 1000))

    // eslint-disable-next-line
  }, [isYourTurn])

  function move(x, y) {
    // Phải nói thật là éo dùng được nó truy vấn lâu vcl 
    // moveOnBoard({ matchId, moveTo: [x, y] }).then(function (result) {
    //   console.log(result)
    // }).catch(function (error) {
    //   console.error(error)
    // })
    // hết 
    if (gameover)
      return

    if (!isYourTurn)
      return

    if (board[x][y] !== null)
      return
    board[x][y] = mark

    setBoard(deepClone(board))
    setIsYourTurn(false)

    if (won(board, 5, [x, y]))
      UpdateBoardToFirebase(board, mark)
    else
      UpdateBoardToFirebase(board)

  }

  function UpdateBoardToFirebase(board, winner) {
    // Update to Firestore
    firestore.runTransaction((transaction) => {
      return transaction.get(matchRef).then((match) => {
        transaction.update(matchRef, { board: JSON.stringify(board), turn: 1 - mark, winner: winner !== undefined ? winner : -1 })
        return `Successfully update ${['X', 'O'][mark]}`
      })
    }).then((r) => {
      console.log(r)
    }).catch((err) => {
      console.error(err)
    })
  }

  function UpdateHistoryToFirebase(finisedMatch) {
    const historyMatchRef = firestore.collection('historyMatches').doc(match.id)
    return firestore.runTransaction((transaction) => {
      return historyMatchRef.get()
        .then((doc) => {
          if (doc.exists) {
            return 'Match History Documents already existed!'
          }
          delete finisedMatch.board
          delete finisedMatch.ready
          transaction.set(historyMatchRef, finisedMatch)
        })
    })
  }

  return {
    board,
    move,
    mark,
    isYourTurn,
    timeOnBar
  }
}

export default useBoardState