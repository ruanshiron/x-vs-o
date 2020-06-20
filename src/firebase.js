import firebaseApp from 'firebase/app'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

export const firebaseConfig = {
  apiKey: "AIzaSyAwszKnu_Fpju1PSW1fWpx-yqo6ZJrqKqs",
  authDomain: "x-vs-o-it-nihongo.firebaseapp.com",
  databaseURL: "https://x-vs-o-it-nihongo.firebaseio.com",
  projectId: "x-vs-o-it-nihongo",
  storageBucket: "x-vs-o-it-nihongo.appspot.com",
  messagingSenderId: "7884551633",
  appId: "1:7884551633:web:f1922698d4dfc445a9dcf0",
  measurementId: "G-D01685HRGR"
}

firebaseApp.initializeApp(firebaseConfig)

const provider = new firebaseApp.auth.GoogleAuthProvider()
const auth = firebaseApp.auth()
const firestore = firebaseApp.firestore()
const storage = firebaseApp.storage()
const functions = firebase.functions()

if (window.location.hostname === "localhost") {
  firestore.settings({
    host: "localhost:8000",
    ssl: false
  })

  functions.useFunctionsEmulator('http://localhost:5001')
}

export { firestore, provider, auth, storage, functions }