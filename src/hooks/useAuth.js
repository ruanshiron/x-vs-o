import { provider, auth, firestore } from '../firebase'

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
          const stats = {
            wins: 0,
            losses: 0,
            points: 0,
            ranks: 0,
            elo: 0
          }
          if (!userRef.exists) {
            userRef.set({
              displayName: result.user.displayName, 
              email: result.user.email,
              stats,
              block: false
            })
            return 
          }
          const userData = userDoc.data()
          if (userData.stats)
            transaction.update(userRef, { displayName: result.user.displayName, email: result.user.email })
          else
            transaction.update(userRef, { displayName: result.user.displayName, email: result.user.email, stats, block: false })
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