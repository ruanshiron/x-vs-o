import React from 'react'
import { List, Typography } from 'antd';

const data = [
  {
    title: 'Điểm',
    value: 1201
  },
  {
    title: 'Rank',
    value: 'Vàng'
  },
  {
    title: 'Số trận đã chơi',
    value: 102
  },
  {
    title: 'Số trận thắng',
    value: 54
  },
  {
    title: 'Tỉ lệ thắng',
    value: Math.floor(54/102*100)
  },
  {
    title: 'ELO',
    value: 291
  }
]

function Stats(props) {
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