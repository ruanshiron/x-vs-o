import React, { useState, useEffect } from 'react'
import { auth, firestore } from '../firebase'
import { message, Spin, Row } from 'antd'

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
      .then(async user => {
        if (user !== null && user !== undefined) {
          const userData = await getUserDocument(user.uid)
          setSignedUser({ ...user, ...userData })
        } else {
          setSignedUser(user)
        }
      }).catch(error => {
        message.error(error)
      })
  }

  const onAuthStateChanged = () => {
    return auth.onAuthStateChanged(async user => {
      if (user !== null && user !== undefined) {
        const userData = await getUserDocument(user.uid)
        setSignedUser({ ...user, ...userData })
      } else {
        setSignedUser(user)
      }
    })
  }

  const Loading = () => {
    return (
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <Spin />
      </Row>
    )
  }

  const getUserDocument = (uid) => {
    const userRef = firestore.collection('users').doc(uid)
    return new Promise((resolve, reject) => {
      userRef.get()
        .then((userDoc) => {
          if (!userDoc.exists)
            reject('User is not existed!')

          resolve(userDoc.data())
        })
    })
  }

  useEffect(() => {
    getCurrentUser()
    onAuthStateChanged()
    // eslint-disable-next-line
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