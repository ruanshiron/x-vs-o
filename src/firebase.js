import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

firebase.initializeApp(firebaseConfig)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const firestore = firebase.firestore()