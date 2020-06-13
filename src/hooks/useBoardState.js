import { useState, useEffect } from 'react'
import { firestore } from '../firebase'
import firebase from 'firebase'
import { won } from '../util'

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
function useBoardState(matchId) {

  const [board, setBoard] = useState(init_board())
  const [mark, setMark] = useState(false)
  const matchRef = firestore.collection("matches").doc(matchId)

  const moveOnBoard = firebase.functions().httpsCallable('moveOnBoard')

  // useEffect(() => {
  //   setMark(m => !m)
  // }, [board])

  useEffect(() => {
    // New Board update
    // const moveTo = [Math.floor(Math.random() * 14), Math.floor(Math.random() * 14)]
    // const moveTo = [6, 4]
    // firestore.runTransaction((transaction) => {
    //   return transaction.get(matchRef).then((match) => {
    //     if (!match.exists) {
    //       throw "Document does not exist!";
    //     }

    //     const matchData = match.data()
    //     const mark = 1

    //     console.log(matchData)
    //     let newBoard = matchData.board ? JSON.parse(matchData.board) : init_board()

    //     if (newBoard[moveTo[0]][moveTo[1]] != null) {
    //       return Promise.reject("You can NOT move here!")
    //     } else {
    //       newBoard[moveTo[0]][moveTo[1]] = mark

    //       transaction.update(matchRef, { board: JSON.stringify(newBoard) })

    //       if (won(newBoard, 5, moveTo)) {
    //         return { status: 'over' }
    //       } else {
    //         return { status: 'not over' }
    //       }
    //     }
    //   })
    // }).then((r) => {
    //   console.log(r.status)
    // }).catch((err) => {
    //   console.error(err)
    // })

    // firestore.collection("matches").doc(matchId)
    //   .onSnapshot((doc) => {
    //     console.log("Current data: ", doc.data())
    //     // setBoard(doc.data().board)
    //   })


    // matchRef.onSnapshot({
    //   // Listen for document metadata changes
    //   includeMetadataChanges: true
    // }, function (doc) {
    //   let newBoard = doc.data().board ? JSON.parse(doc.data().board) : init_board()
    //   setBoard(newBoard)
    // })
  })

  function move(x, y) {
    // if (board[x][y] !== null)
    //   return
    // board[x][y] = mark
    // setBoard(deepClone(board))

    moveOnBoard({ matchId, moveTo: [x, y] }).then(function (result) {
      console.log(result)
    }).catch(function (error) {
      console.error(error)
    })
  }

  return {
    board,
    move
  }
}

export default useBoardState