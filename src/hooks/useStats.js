import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function useStats(uid) {
  const [data, setData] = useState([])

  const rankClass = (elo) => {
    // Một người mới biết chơi có trình độ 1000 Elo khi người đó nắm được luật.
    if (elo <= 1000) return 'Newbie'
    // Khoảng 1200 Elo là các người chơi không thường xuyên.
    if (elo <= 1200) return 'Iron'
    // 1600 Elo ứng với người có trình độ trung bình trong một câu lạc bộ.
    if (elo <= 1600) return 'Bronze'
    // 1800 Elo ứng với người có trình độ khá trong một câu lạc bộ.
    if (elo <= 1800) return 'Silver'
    // 2000 Elo ứng với người có trình độ cao trong một câu lạc bộ.
    if (elo <= 2000) return 'Gold'
    // 2200 Elo trở lên ứng với trình độ kiện tướng (Master).
    if (elo <= 2200) return 'Master'
    // 2400 Elo trở lên ứng với trình độ kiện tướng quốc tế (International Master).
    if (elo <= 2400) return 'International Master'
    // 2500 Elo trở lên ứng với trình độ đại kiện tướng (Grand Master).
    return 'Grand Master'
  }

  useEffect(() => {
    firestore.collection('users').doc(uid).get()
      .then((doc) => {
        const { rank, wins, matches, elo } = doc.data()
        setData([
          {
            title: 'クラス',
            value: rankClass(rank),
            key: 'class'
          },
          {
            title: 'ランク',
            value: rank,
            key: 'rank'
          },
          {
            title: 'ELO',
            value: elo,
            key: 'elo'
          },
          {
            title: '勝ち',
            value: wins,
            key: 'wins'
          },
          {
            title: '対戦数',
            value: matches,
            key: 'matches'
          },
          {
            title: '勝率',
            value: isNaN((Math.floor(wins / (matches) * 100))) ? '_' : (Math.floor(wins / (matches) * 100)) + '%'
          },
        ])
      })
  }, [uid])

  return {
    data
  }
}