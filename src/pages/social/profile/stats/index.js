import React from 'react'
import { List, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import useStats from '../../../../hooks/useStats'

function Stats() {

  let { uid } = useParams()

  const { data } = useStats(uid)


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