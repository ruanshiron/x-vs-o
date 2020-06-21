import { provider, auth, firestore } from '../firebase'
import { UserModel } from '../model'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import indexSearch from '../algoliasearch'

export default function useAuth() {

  const { setSignedUser } = useContext(UserContext)

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
            const userData = {
              ...UserModel, 
              displayName: result.user.displayName, 
              email: result.user.email,
              photoURL: result.user.photoURL
            }
            
            userRef.set(userData)
            indexSearch.saveObject(userData)
            return 
          }

          
          const userData = { ...userDoc.data(), displayName: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL }
          setSignedUser(u => ({...u, ...userData}))
          transaction.update(userRef, { ...userData})

          userData.objectID = result.user.uid
          indexSearch.saveObject(userData)
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