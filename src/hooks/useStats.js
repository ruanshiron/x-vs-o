import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function useStats(uid) {
  const [data, setData] = useState([])

  useEffect(() => {
    firestore.collection('users').doc(uid).get()
      .then((doc) => {
        const { points, rank, wins, losses, elo } = doc.data()
        setData([
          {
            title: 'ポイント',
            value: points,
            key: 'points'
          },
          {
            title: 'ランク',
            value: rank,
            key: 'rank'
          },
          {
            title: '敗北',
            value: losses,
            key: 'losses'
          },
          {
            title: '勝ち',
            value: wins,
            key: '勝ち'
          },
          // {
          //   title: '勝率',
          //   value: Math.floor(wins / (losses + wins) * 100)
          // },
          {
            title: 'ELO',
            value: elo,
            key: 'elo'
          }
        ])
      })
  }, [uid])

  return {
    data
  }
}