import React from 'react'
import { Layout } from 'antd'


function Footer(props) {
  return (
  <Layout.Footer style={{ textAlign: 'center' }}>{props.children}<br/><br/>Team NaNa</Layout.Footer>
  )
}

export default Footer