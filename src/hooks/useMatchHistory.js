import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function useMatchHistory(uid) {
  const [data, setData] = useState([])
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    firestore.collection('historyMatches').where('users', 'array-contains', uid).orderBy('created', 'desc')
      .get()
      .then((querySnapshot) => {
        const newData = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { winner, users, created, points } = doc.data()

          const userIndex = users.indexOf(uid)

          newData.push({
            key: doc.id,
            win: winner === userIndex,
            point: points ? points[userIndex] : '?',
            opponent: { uid: users[1 - userIndex], displayName: null },
            created: created.toDate()
          })
        })
        // console.log(newData);

        setData(newData)
        setIsPending(false)

        let opponents = newData.map(d => d.opponent.uid)
        opponents = [...new Set(opponents)].filter((v) => v !== undefined)
        

        Promise.all(opponents.map((u, i) => {
          return firestore.collection('users').doc(u).get()
            .then((result) => {
              if (!result.exists) {
                return [u, '?']
              }
              
              return [u, result.data()?.displayName]
            })
        }))
          .then((r) => {
            let opponentsData = {}
            r.forEach(v => {
              opponentsData[v[0]] = v[1]
            })
            return opponentsData
          })
          .then(oppData => {
            newData.forEach((u, i) => {
              const uid = newData[i].opponent.uid
              newData[i].opponent.displayName = oppData[uid]
              setData([...newData])
            })
          })



      })
  }, [uid])

  useEffect(() => {

  }, [data])

  return {
    data,
    isPending
  }
}