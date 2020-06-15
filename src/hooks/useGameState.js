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
    ready: false,
    turn: 0,
    winner: -1,
    created: firebase.firestore.FieldValue.serverTimestamp()
  }

  useEffect(() => {
    matchRef.where('ready', '==', false).limit(1).get()
      .then((snapshot) => {
        if (snapshot.size === 0) { // create new match and wait other player
          matchRef.add(newMatch)
            .then(r => {
              const unsubscribe = matchRef.doc(r.id).onSnapshot((doc) => {
                if (doc.data().ready) {

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
                if (xdoc.data().ready) {
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
                ready: true
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return {
    match
  }
}

export default useGameState