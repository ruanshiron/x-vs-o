import React from 'react'
import {  Tag, Table } from 'antd'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import LinkButton from '../../../../components/LinkButton'
import useMatchHistory from '../../../../hooks/useMatchHistory'


const columns = [
  {
    title: 'Win',
    dataIndex: 'win',
    key: 'win',
    render: (win) => <Tag color={win ? '#87d068' : '#f50'}>{win ? '勝ち' : '負け'}</Tag>
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
    title: 'Created',
    key: 'created',
    dataIndex: 'created',
    align: 'right',
    render: (created) => (created.toLocaleString('ja-JP')),
    fixed: 'right',
    width: 72
  }
];

function History({ defaultPage }) {
  let { uid } = useParams()
  let history = useHistory()
  let location = useLocation()
  const { data } = useMatchHistory(uid)


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