import React from 'react'
import {  Tag, Table } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import LinkButton from '../../../../components/LinkButton'

const data = [
  {
    win: true,
    point: 10,
    opponent: 'vinh1',
    time: new Date().toISOString()
  },
  {
    win: false,
    point: -10,
    opponent: 'hellomudkjan',
    time: new Date().toISOString()
  }
]

for (let index = 0; index < 3; index++) {
  data.push(...data)
}


const columns = [
  {
    title: 'Win',
    dataIndex: 'win',
    key: 'win',
    render: (win) => <Tag color={win ? '#87d068' : '#f50'}>{win ? '勝ち' : '負け'}</Tag>,
  },
  {
    title: 'Point',
    dataIndex: 'point',
    key: 'point',
    render: (point) => (point > 0 ? '+' + point : point)
  },
  {
    title: 'Opponent',
    dataIndex: 'opponent',
    key: 'opponent',
    render: (opponent) => <LinkButton type='link' to={`/social/${opponent}`} >{opponent}</LinkButton>
  },
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time',
    align: 'right',
    render: (time) => (time.toLocaleString('ja-JP')),
  }
];

function History({ defaultPage }) {
  let history = useHistory()
  let location = useLocation()

  return (
    <Table
      columns={columns}
      pagination={{
        onChange: page => {
          console.log(page)
          history.push(location.pathname + '?p=' + page)
        },
        showQuickJumper: true,
        defaultCurrent: defaultPage,
        showSizeChanger: true,
        responsive: true
      }}
      dataSource={data}
      showHeader={false}
    />
  )

}

export default History