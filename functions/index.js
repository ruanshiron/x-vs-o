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


exports.onDeleteUser = functions.auth.user().onDelete((user) => {
  db.collection('users').doc(user.uid).delete()
})
