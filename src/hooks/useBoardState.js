import { useState, useEffect, useContext } from 'react'
import { firestore } from '../firebase'
import { won } from '../util'
import { UserContext } from '../contexts/UserContextProvider'
import { Modal } from 'antd'
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

    firestore.collection("matches").doc(match.id)
      .onSnapshot((doc) => {
        const { board, turn, winner } = doc.data()

        if (board) setBoard(JSON.parse(board))
        if (turn === mark) setIsYourTurn(true)

        if (winner !== -1) {
          setIsYourTurn(false)

          const title = winner === mark ? 'Victory' : 'Defeat' 

          Modal.confirm({
            title: title,
            cancelText: 'Stay',
            okText: 'leave',
            onOk: () => history.replace('/')
          })
        }
      })
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