import React from 'react'
import { Card, Typography, Table } from 'antd'

const data = [

];

for (let index = 0; index < 100; index++) {
  data.push({
    key: index+1,
    top: index+1,
    username: 'vinh' + index,
    losses: 102,
    wins: 143 + 1 * index,
    point: 2013 + index * 10
  })
}
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
    render: (username, record) => <Typography.Title  level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{username}</Typography.Title>,
    ellipsis: true,
    width: 128
  },
  {
    title: 'ポイント',
    key: 'point',
    dataIndex: 'point',
    align: 'right',
    render: (point, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{point}</Typography.Title>
  },
  {
    title: '負け',
    dataIndex: 'losses',
    key: 'losses',
    align: 'right',
    render: (losses, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{losses}</Typography.Title>
  },
  {
    title: '勝ち',
    dataIndex: 'wins',
    key: 'wins',
    align: 'right',
    render: (wins, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{wins}</Typography.Title>
  }
];

function Rankings(props) {
  return (
    <div className="site-layout-background" >
      <Card style={{ width: '100%', marginTop: 16 }} >
        <Table
          columns={columns}
          dataSource={data}
          showHeader={true}
          pagination={{
            showSizeChanger: false,
            pageSize: 100,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {}
            }
          }}
          scroll={{x: true}}
        />
      </Card>
    </div>
  )
}

export default Rankings