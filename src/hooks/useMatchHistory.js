import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function useMatchHistory(uid) {
  const [data, setData] = useState([])

  useEffect(() => {
    firestore.collection('matches').where('users', 'array-contains', uid)
      .get()
      .then((querySnapshot) => {
        const newData = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { winner, users, created} = doc.data()


          newData.push({
            key: doc.id,
            win: winner === users.indexOf(uid),
            point: '?',
            opponent: users[1 - users.indexOf(uid)],
            created: created.toDate()
          })
        })
        console.log(newData);
        
        setData(newData)
      })
  }, [uid])

  useEffect(() => {

  }, [data])

  return {
    data
  }
}