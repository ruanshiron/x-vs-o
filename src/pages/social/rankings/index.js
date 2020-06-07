import React from 'react'
import { Card, Typography, Table } from 'antd'

const data = [

];

for (let index = 0; index < 100; index++) {
  data.push({
    top: index+1,
    username: 'vinh' + index,
    losses: 102,
    wins: 143 + 1 * index,
    point: 2013 + index * 10
  })
}
const columns = [
  {
    title: 'top',
    dataIndex: 'top',
    key: 'top',
    render: (top) => <Typography.Title level={top > 1 ? top > 3 ? 4 : 3 : 2}>{top}</Typography.Title>
  },
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
    render: (username, record) => <Typography.Title level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{username}</Typography.Title>
  },
  {
    title: 'losses',
    dataIndex: 'losses',
    key: 'losses',
    render: (losses, record) => <Typography.Title level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{losses}負け</Typography.Title>
  },
  {
    title: 'wins',
    dataIndex: 'wins',
    key: 'wins',
    render: (wins, record) => <Typography.Title level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{wins}勝ち</Typography.Title>
  },
  {
    title: 'point',
    key: 'point',
    dataIndex: 'point',
    align: 'right',
    render: (point, record) => <Typography.Title level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{point}ポイント</Typography.Title>
  }
];

function Rankings(props) {
  return (
    <div className="site-layout-background" >
      <Card style={{ width: '100%', marginTop: 16 }} >
        <Table
          columns={columns}
          dataSource={data}
          showHeader={false}
          pagination={{
            showSizeChanger: false,
            pageSize: 100,
            responsive: true,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {}
            }
          }}
        />
      </Card>
    </div>
  )
}

export default Rankings