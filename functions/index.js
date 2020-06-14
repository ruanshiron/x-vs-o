const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

const util = require('./util')
const { won, init_board } = util

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!")
// });


exports.moveOnBoard = functions.https.onCall((data, context) => {
  // Message text passed from the client.
  const { matchId, moveTo } = data
  // Authentication / user information is automatically added to the request.
  const uid = context.auth.uid
  // const name = context.auth.token.name || null
  // const picture = context.auth.token.picture || null
  // const email = context.auth.token.email || null
  // end 

  const matchRef = db.collection('matches').doc(matchId)

  return db.runTransaction((transaction) => {
    return transaction.get(matchRef).then((match) => {
      if (!match.exists) {
        return { status: 'not existed' }
      }

      const matchData = match.data()
      const mark = matchData.users.indexOf(uid)
      
      if (mark === -1) {
        return {status: 'you are not in this match'}
      }

      console.log(matchData)
      let newBoard = matchData.board ? JSON.parse(matchData.board) : init_board()

      if (newBoard[moveTo[0]][moveTo[1]] !== null) {
        return { status: 'not allow to move here' }
      } else {
        newBoard[moveTo[0]][moveTo[1]] = mark

        transaction.update(matchRef, { board: JSON.stringify(newBoard) })

        if (won(newBoard, 5, moveTo)) {
          return { status: 'over', winner: uid }
        } else {
          return { status: 'not over' }
        }
      }
    })
  }).then((r) => {
    return r
  }).catch((err) => {
    return err
  })
})

