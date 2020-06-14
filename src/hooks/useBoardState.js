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

  useEffect(() => {

    matchRef.onSnapshot((doc) => {
      const { board, turn, winner } = doc.data()

      if (board) setBoard(JSON.parse(board))
      if (turn === mark) setIsYourTurn(true)

      if (winner !== -1) {
        setIsYourTurn(false)

        const promt = winner === mark ?
          { title: '勝利', message: '最高です！', icon: <SmileTwoTone /> }
          :
          { title: '敗北', message: '次の対戦に頑張りましょう！', icon: <MehTwoTone /> }

        Modal.confirm({
          title: promt.title,
          content: promt.message,
          icon: promt.icon,
          cancelText: '留まる',
          okText: '離れる',
          onOk: () => history.replace('/')
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function move(x, y) {
    // Phải nói thật là éo dùng được nó truy vấn lâu vcl 
    // moveOnBoard({ matchId, moveTo: [x, y] }).then(function (result) {
    //   console.log(result)
    // }).catch(function (error) {
    //   console.error(error)
    // })
    // hết 
    if (!isYourTurn)
      return

    if (board[x][y] !== null)
      return
    board[x][y] = mark

    setBoard(deepClone(board))
    setIsYourTurn(false)

    if (won(board, 2, [x, y]))
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

  return {
    board,
    move,
    mark,
    isYourTurn
  }
}

export default useBoardState