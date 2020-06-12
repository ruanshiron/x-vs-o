import { useState, useEffect } from 'react'
import firebase from 'firebase/app'

function useGameState(user) {
  const db = firebase.firestore()
  const matchRef = db.collection('matches')

  const [matchId, setMatchId] = useState(null)

  const newMatch = {
    users: [user.uid],
    state: 0
  }

  useEffect(() => {
    matchRef.where('state', '==', 0).limit(1).get()
      .then((snapshot) => {
        if (snapshot.size === 0) {
          matchRef.add(newMatch)
            .then(r => {
              setMatchId(r.id)
            })
        } else {
          snapshot.forEach((doc) => {
            const match = doc.data()

            if (match.users.includes(user.uid)) {
              setMatchId(doc.id)
            } else {
              matchRef.doc(doc.id).set({
                users: [...match.users, user.uid],
                state: 1
              })
                .then(() => {
                  setMatchId(doc.id)
                })
            }
          })
        }
      })
  })

  return {
    matchId
  }
}

export default useGameState