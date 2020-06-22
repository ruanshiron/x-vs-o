import React from 'react'
import { Layout, Typography, Divider } from 'antd'
import { Link } from 'react-router-dom'


function Footer(props) {
  return (
  <Layout.Footer style={{ textAlign: 'center', backgroundColor: '#fff'}}>
    {props.children}
    <Divider />
    <Link to='/'><Typography.Text strong>ナナ</Typography.Text></Link>
  </Layout.Footer>
  )
}

export default Footer