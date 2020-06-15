import { useEffect, useState } from 'react'
import { firestore } from '../firebase'

export default function useRankings() {
  const [topRank, setTopRank] = useState([])

  useEffect(() => {
    // for (let index = 0; index < 100; index++) {
    //   firestore.collection('users').doc(`example${index}`).set({
    //     email: `example${index}@example.com`,
    //     displayName: `example${index}`,
    //     points: index * 25,
    //     rank: index,
    //     wins: 0,
    //     losses: 0,
    //     elo: 0,
    //     blocked: false
    //   })
    // }
    firestore.collection('users').where('rank', '>', 0).orderBy('rank').limit(100)
      .get()
      .then((snapshot) => {
        let newData = []
        snapshot.forEach((doc) => {
          const userData = doc.data()
          newData.push({
            key: userData.rank,
            top: userData.rank,
            uid: doc.id,
            username: userData.displayName,
            losses: userData.losses,
            wins: userData.wins,
            point: userData.points
          })
        })

        setTopRank(newData)
        console.log(newData);

      })

  }, [])



  return {
    topRank
  }

}