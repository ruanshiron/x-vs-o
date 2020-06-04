import React from 'react'
import { Layout} from 'antd'
import './style.css'
import SocialHeader from './header'
import Profile from './profile'

const { Content, Footer } = Layout

const contentStyle = { marginTop: 64, background: '#fff' }

function Social() {
  return (
    <Layout>
      <SocialHeader/>

      <Content style={contentStyle}>
        <Profile />
      </Content>

      <Footer style={{ textAlign: 'center' }}>Team NaNa</Footer>

    </Layout>
  )
}

export default Social