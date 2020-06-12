const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!")
// });


exports.matchmaking = functions.firestore
  .document('players/{userId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();

    const playerId = snap.id

    return db.runTransaction(function(trs) {
      return trs.get(db.collection('rooms')
        .where('isFull', '==', false)
        .limit(1))
        .then((result) => {
          var roomId
          if (result.size == 1) {
            const snapshot = result.docs[0]
            const room = snapshot.data()
            const players = [...room.players, playerId]
            const isFull = true 
            trs.set(snapshot.ref, { players, isFull })
            roomId = snapshot.id
          } else {
            const newRoom = {
              players: [playerId],
              isFull: false
            }
            const roomRef = db.collection('rooms').doc()
            trs.set(roomRef, newRoom);
            roomId = roomRef.id
          }
        })
    })
  })

