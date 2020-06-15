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
          const { winner, users, created } = doc.data()


          newData.push({
            key: doc.id,
            win: winner === users.indexOf(uid),
            point: '?',
            opponent: { uid: users[1 - users.indexOf(uid)], displayName: null },
            created: created.toDate()
          })
        })
        // console.log(newData);

        setData(newData)

        newData.map((u, i) => {
          firestore.collection('users').doc(u.opponent.uid).get()
            .then((result) => {
              newData[i].opponent = {uid: u.opponent.uid, displayName: result.data().displayName}
              
              setData([...newData])
            })
        })

      })
  }, [uid])

  useEffect(() => {

  }, [data])

  return {
    data
  }
}