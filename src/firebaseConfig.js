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
};

export const provider = new firebase.auth.GoogleAuthProvider();

class Firebase {
	constructor() {
		firebase.initializeApp(firebaseConfig)
		this.auth = firebase.auth()
		this.db = firebase.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	getCurrentUserMail() {
		return this.auth.currentUser && this.auth.currentUser.email
	}

	signInWithGoogle = () => this.auth.signInWithPopup(provider);
}

export default new Firebase()