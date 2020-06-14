import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function useStats(uid) {
  const [data, setData] = useState([])

  useEffect(() => {
    firestore.collection('users').doc(uid).get()
      .then((doc) => {
        const { points, ranks, wins, losses } = doc.data().stats
        setData([
          {
            title: 'ポイント',
            value: points
          },
          {
            title: 'ランク',
            value: ranks
          },
          {
            title: '対戦',
            value: wins + losses
          },
          {
            title: '勝ち',
            value: wins
          },
          // {
          //   title: '勝率',
          //   value: Math.floor(wins / (losses + wins) * 100)
          // },
          // {
          //   title: 'ELO',
          //   value: 291
          // }
        ])
      })
  }, [])

  return {
    data
  }
}