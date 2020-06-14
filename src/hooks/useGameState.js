import { useState, useEffect, useContext } from 'react'
import firebase from 'firebase/app'
import { UserContext } from '../contexts/UserContextProvider'

function useGameState() {
  const db = firebase.firestore()
  const matchRef = db.collection('matches')

  const [match, setMatch] = useState()
  const { signedInUser } = useContext(UserContext)

  const newMatch = {
    users: [signedInUser.uid],
    state: 0,
    turn: 0,
    winner: -1
  }

  useEffect(() => {
    matchRef.where('state', '==', 0).limit(1).get()
      .then((snapshot) => {
        if (snapshot.size === 0) { // create new match and wait other player
          matchRef.add(newMatch)
            .then(r => {
              const unsubscribe = matchRef.doc(r.id).onSnapshot((doc) => {
                if (doc.data().state === 1) {

                  setMatch({
                    ...doc.data(),
                    id: doc.id
                  })

                  unsubscribe()
                }
              })
            })
        } else { // matchmaking done
          snapshot.forEach((doc) => {
            const match = doc.data()
            if (match.users.includes(signedInUser.uid)) {
              const unsubscribe = matchRef.doc(doc.id).onSnapshot((xdoc) => {
                if (xdoc.data().state === 1) {
                  setMatch({
                    ...xdoc.data(),
                    id: xdoc.id
                  })

                  unsubscribe()
                }
              })
            } else {
              const updateMatch = {
                ...newMatch,
                users: [...match.users, signedInUser.uid],
                state: 1
              }
              matchRef.doc(doc.id).set(updateMatch)
                .then(() => {
                  setMatch({
                    ...updateMatch,
                    id: doc.id
                  })
                })
            }
          })
        }
      })
  }, [])


  return {
    match
  }
}

export default useGameState