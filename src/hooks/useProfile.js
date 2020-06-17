import { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';

export default function useProfile(uid) {
  const [profile, setProfile] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const changeDisplayName = (newDisplayName) => {
    const userRef = firestore.collection('users').doc(uid)
    return firestore.runTransaction(function (transaction) {
      return transaction.get(userRef).then(function (userDoc) {
        if (!userDoc.exists) {
          throw new Error('User Document is now existed!')
        }

        transaction.update(userRef, { displayName: newDisplayName })
        auth.currentUser.updateProfile({ displayName: newDisplayName })
          .then(() => setProfile(p => ({ ...p, displayName: newDisplayName })))
      })
    })
  }

  useEffect(() => {
    firestore.collection('users').doc(uid).get()
      .then((doc) => {
        const { displayName, email, photoURL } = doc.data()
        setProfile({ displayName, email, photoURL })
        setIsLoading(false)
      })
  }, [uid])

  return {
    profile,
    changeDisplayName,
    isLoading
  }
}