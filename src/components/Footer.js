import React from 'react'
import { Layout, Typography, Divider } from 'antd'


function Footer(props) {
  return (
  <Layout.Footer style={{ textAlign: 'center', backgroundColor: '#fff'}}>
    {props.children}
    <Divider />
    <Typography.Text strong>ナナ</Typography.Text>
  </Layout.Footer>
  )
}

export default Footer