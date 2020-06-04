import React from 'react'
import { List, Tag, Typography, Button } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'

const data = [
  {
    win: true,
    point: 10,
    opponent: 'vinh1',
    time: new Date(2018, 11, 24, 10, 33, 30, 0)
  },
  {
    win: false,
    point: -10,
    opponent: 'hellomudkjan',
    time: new Date(2018, 1, 24, 10, 33, 30, 0)
  }
]

for (let index = 0; index < 3; index++) {
  data.push(...data)
}

function HistoryItem({win, point, opponent, time}) {
  return (
    <List.Item>
      <Typography.Text strong><Tag color={win ? '#87d068' : '#f50'}>{win ? '勝ち' : '負け'}</Tag> {point > 0 ? '+' + point : point}</Typography.Text>
      <Button type="link">{opponent}</Button>
      <Typography>{time.toLocaleString('ja-JP')}</Typography>
    </List.Item>
  )
}

function History({defaultPage}) {
  let history = useHistory()
  let location = useLocation()
  
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      pagination={{
        onChange: page => {
          console.log(page)
          history.push(location.pathname + '?p=' + page)
        },
        showQuickJumper: true,
        defaultCurrent: defaultPage,
        showSizeChanger: true
      }}
      renderItem={item => (
        <HistoryItem
          win={item.win}
          point={item.point}
          opponent={item.opponent}
          time={item.time}
        />
      )}
    />

  )
}

export default History