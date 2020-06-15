import { useEffect, useState } from 'react'
import { firestore } from '../firebase'

export default function useRankings() {
  const [topRank, setTopRank] = useState([])
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
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
        setIsPending(false)
      })

  }, [])



  return {
    topRank,
    isPending
  }

}