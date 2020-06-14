import React from 'react'
import { Layout, Typography } from 'antd'


function Footer(props) {
  return (
  <Layout.Footer style={{ textAlign: 'center' }}>
    {props.children}
    <Typography.Text strong>ナナ</Typography.Text>
  </Layout.Footer>
  )
}

export default Footer