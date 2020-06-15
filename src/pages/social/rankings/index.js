import React from 'react'
import { Card, Typography, Table } from 'antd'
import { firestore } from '../../../firebase'
import {transformDocs} from '../../../util'
const data = [];

let loadData = async function () {
  let result = await firestore
    .collection('users')
    .get()

  let docs = result.docs
  let users = transformDocs(docs)

  let showUserData = function(){
    for(let i = 0;i< users.length;i++){
      data.push({
        top: i +1,
        username: users[i].displayName,
        losses: users[i].stats.losses,
        wins: users[i].stats.wins,
      })
    
    }
    }
}
loadData()

// let showUserData = function(){
// for(let i = 0;i< users.length;index++){
//   data.push({
//     top: i +1,
//     username: users[i].displayName,
//     losses: users[i].stats.losses,
//     wins: users[i].stats.wins,
//   })

// }
// }
// for (let index = 0; index < 100; index++) {
//   data.push({
//     top: index + 1,
//     username: 'vinh' + index,
//     losses: 102,
//     wins: 143 + 1 * index,
//     point: 2013 + index * 10
//   })
// }
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
<<<<<<< Updated upstream
    render: (username, record) => <Typography.Title  level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{username}</Typography.Title>
=======
    render: (username, record) => <Typography.Title level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{username}</Typography.Title>,
    ellipsis: true,
    width: 128
>>>>>>> Stashed changes
  },
  {
    title: 'losses',
    dataIndex: 'losses',
    key: 'losses',
    align: 'right',
    render: (losses, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{losses}負け</Typography.Title>
  },
  {
    title: 'wins',
    dataIndex: 'wins',
    key: 'wins',
    align: 'right',
    render: (wins, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{wins}勝ち</Typography.Title>
  },
  {
    title: 'point',
    key: 'point',
    dataIndex: 'point',
    align: 'right',
    render: (point, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{point}ポイント</Typography.Title>
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
              onClick: event => { }
            }
          }}
<<<<<<< Updated upstream
=======
          scroll={{ x: true }}
>>>>>>> Stashed changes
        />
      </Card>
    </div>
  )
}

export default Rankings