import React, { useState } from 'react'
import { Layout, Spin, Switch, Button, Modal } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Footer from '../../components/Footer'
import Game from '../../components/Game'

import 'react-chat-widget/lib/styles.css'
import { SuspenseWithPerf } from 'reactfire'
import Header from '../../components/Header'

const spinIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />

function Play() {

  const [matching, setMatching] = useState(true)


  return (
    <Layout>
      <Header
        hasLogo
      />
      <Layout.Content style={{ marginTop: 64, background: '#fff' }}>
        <div className="site-layout-background" >
          <Game />
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
        <Switch checkedChildren="matching" unCheckedChildren="unmatching" defaultChecked onChange={() => setMatching(m => !m)} />
      </Footer>

    </Layout>
  )
}

export default Play