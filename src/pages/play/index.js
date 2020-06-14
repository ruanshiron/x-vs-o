import React, { useContext } from 'react'
import { Layout, Button, Modal } from 'antd'
import Footer from '../../components/Footer'
import Game from '../../components/Game'

import 'react-chat-widget/lib/styles.css'
import Header from '../../components/Header'
import { UserContext } from '../../contexts/UserContextProvider'


function Play() {
  const { signedInUser } = useContext(UserContext)

  return (
    <Layout>
      <Header />

      <Layout.Content style={{ marginTop: 64, background: '#fff' }}>
        <div className="site-layout-background" >
          {signedInUser && <Game />}
        </div>
      </Layout.Content>

      <Footer />

    </Layout>
  )
}

export default Play