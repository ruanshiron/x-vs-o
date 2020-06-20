import { provider, auth, firestore } from '../firebase'
import { UserModel } from '../model'

export default function useAuth() {

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const register = async (name, email, password) => {
    await auth.createUserWithEmailAndPassword(email, password)
    return auth.currentUser.updateProfile({
      displayName: name
    })
  }

  const logout = () => {
    return auth.signOut()
  }

  const signInWithGoogle = () => {
    return auth.signInWithPopup(provider).then(result => {
      const userRef = firestore.collection('users').doc(result.user.uid)
      return firestore.runTransaction(function (transaction) {
        return transaction.get(userRef).then(function (userDoc) {

          if (!userDoc.exists) {
            userRef.set({
              ...UserModel, 
              displayName: result.user.displayName, 
              email: result.user.email,
              photoURL: result.user.photoURL
            })
            return 
          }
          const userData = userDoc.data()
          transaction.update(userRef, { ...userData, displayName: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL })
        });
      })
    })
  }

  return {
    login,
    logout,
    register,
    signInWithGoogle
  }
}