import React from 'react'
import { List, Typography } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
]

function Stats(props) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Typography.Text strong>ELO</Typography.Text>
          <Typography.Text>0</Typography.Text>
        </List.Item>
      )}
    />
  )
}

export default Stats