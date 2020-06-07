import React from 'react'
import { Layout } from 'antd'
import HomeHeader from '../../components/Header'
import Footer from '../../components/Footer'
import Watching from './watching'

const { Content } = Layout
const contentStyle = { marginTop: 64, background: '#fff' }

function Home() {
  return (
    <Layout>
      <HomeHeader />

      <Content style={contentStyle}>
        <Watching />
      </Content>

      <Footer/>
    </Layout>
  )
}

export default Home