import React, { useEffect } from 'react'
import { List, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import useStats from '../../../../hooks/useStats';

const data = [
  {
    title: 'ポイント',
    value: 1201
  },
  {
    title: 'ランク',
    value: 102
  },
  {
    title: '対戦',
    value: 102
  },
  {
    title: '勝ち',
    value: 54
  },
  {
    title: '勝率',
    value: Math.floor(54/102*100)
  },
  // {
  //   title: 'ELO',
  //   value: 291
  // }
]

function Stats() {

  let { uid } = useParams()

  const { data } = useStats(uid)


  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Typography.Text strong>{item.title}</Typography.Text>
          <Typography.Text>{item.value}</Typography.Text>
        </List.Item>
      )}
    />
  )
}

export default Stats