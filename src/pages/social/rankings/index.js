import React from 'react'
import { Typography, Table } from 'antd'
import useRankings from '../../../hooks/useRankings'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: '',
    dataIndex: 'top',
    key: 'top',
    render: (top) => <Typography.Title level={top > 1 ? top > 3 ? 4 : 3 : 2}>{top}</Typography.Title>,
    fixed: 'left',
    width: 72
  },
  {
    title: '',
    dataIndex: 'username',
    key: 'username',
    render: (username, record) => <Link to={`/social/${record.uid}`}><Typography.Title type='secondary' level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{username}</Typography.Title></Link>,
    ellipsis: true,
    width: 128
  },
  // {
  //   title: 'ポイント',
  //   key: 'point',
  //   dataIndex: 'point',
  //   align: 'right',
  //   render: (point, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{point}</Typography.Title>
  // },
  {
    title: '勝率',
    dataIndex: 'wins',
    key: 'wins',
    align: 'right',
    render: (wins, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{isNaN(wins / record.matches * 100) ? '_' : Math.floor(wins / record.matches * 100)}%</Typography.Title>
  },
  {
    title: 'ELO/ポイント',
    dataIndex: 'elo',
    key: 'elo',
    align: 'right',
    render: (elo, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{elo}</Typography.Title>
  }
];

function Rankings(props) {
  const { topRank, isPending } = useRankings()

  return (
    <div className="site-layout-background" >
      <div className='main-wrapper'>
        <Table
          loading={isPending}
          columns={columns}
          dataSource={topRank}
          showHeader={true}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { }
            }
          }}
          scroll={{ x: true }}
        />
      </div>
    </div>
  )
}

export default Rankings