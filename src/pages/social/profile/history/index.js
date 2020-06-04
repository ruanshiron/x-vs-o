import React, { useState } from 'react'
import { List, Tag, Typography, Button } from 'antd'

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
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]

function History(props) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      pagination={{
        onChange: page => {
          console.log(page);
        },
        showQuickJumper: true,
        // defaultCurrent: 1,
        showSizeChanger: true
      }}
      renderItem={item => (
        <List.Item>
          <Tag color="#87d068">勝ち</Tag>
          <Typography.Text strong>+1</Typography.Text>
          <Button type="link">username</Button>
          <Typography>2020/01/01  01:10</Typography>
        </List.Item>
      )}
    />

  )
}

export default History