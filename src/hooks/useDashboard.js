import { useEffect, useState } from 'react'
import { firestore } from '../firebase'

export default function useDashboard() {
  const [isPending, setIsPending] = useState(true)
  const [users, setUsers] = useState([])

  const handleBlock = (uid) => {
    const userRef = firestore.collection('users').doc(uid)
    return (block) => {
      userRef.update({ blocked: block })
        .then(() => {
          console.log('Update Blocked State successfully!')
          setUsers(users => users.map(u => u.uid === uid ? { ...u, blocked: block } : u))
        })
    }
  }

  useEffect(() => {
    firestore.collection('users').get()
      .then((userDocs) => {
        const newUsersData = []
        userDocs.forEach((doc) => {
          newUsersData.push({
            uid: doc.id,
            handleBlock: handleBlock(doc.id),
            ...doc.data()
          })
        })
        setUsers(newUsersData)
        setIsPending(false)
      })
  }, [])

  return {
    isPending,
    users
  }
}