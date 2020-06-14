import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'

export const UserContext = React.createContext(false)

export default function UserContextProvider({ children }) {
  const [signedInUser, setSignedUser] = useState()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setSignedUser(user)
    })
  }, [])

  return (
    <UserContext.Provider value={{signedInUser, setSignedUser}}>
      { children }
    </UserContext.Provider>
  )
}