import { provider, auth } from '../firebase'

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
    return auth.signInWithPopup(provider)
  }

  return {
    login,
    logout,
    register,
    signInWithGoogle
  }
}