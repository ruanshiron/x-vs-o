import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { message, Spin, Row, Col } from 'antd'

export const UserContext = React.createContext(false)

export default function UserContextProvider({ children }) {
  const [signedInUser, setSignedUser] = useState()

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }

  const Loading = () => {
    return (
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <Spin />
      </Row>
    )
  }

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        setSignedUser(user)
      })
      .catch(error => {
        message.error(error)
      })
  }, [])

  return (
    <UserContext.Provider value={{ signedInUser, setSignedUser }}>
      {
        typeof signedInUser === 'undefined' ?
          <Loading />
          :
          children
      }
    </UserContext.Provider>
  )
}