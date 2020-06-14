import React, { useContext } from 'react'
import { Layout, Button, Modal } from 'antd'
import Footer from '../../components/Footer'
import Game from '../../components/Game'

import 'react-chat-widget/lib/styles.css'
import Header from '../../components/Header'
import { UserContext } from '../../contexts/UserContextProvider'
import ChatBox from '../../components/ChatBox'


function Play() {
  const { signedInUser } = useContext(UserContext)

  return (
    <Layout>
      <Header />

      {/* <ChatBox 
      
      /> */}

      <Layout.Content style={{ marginTop: 64, background: '#fff' }}>
        <div className="site-layout-background" >
          {signedInUser && <Game />}
        </div>
      </Layout.Content>

      <Footer>
        <Button
          onClick={
            () => Modal.confirm({ title: 'ここでの勝利または敗北の発表', cancelText: 'Stay', okText: 'leave', onOk: () => console.log('leave') })
          }
        >
          Win
        </Button>
      </Footer>

    </Layout>
  )
}

export default Play