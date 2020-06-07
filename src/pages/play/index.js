import React from 'react'
import { Layout, Row, Col, Card, Button, Divider, Tag, Typography, Tooltip } from 'antd'
import Footer from '../../components/Footer'
import Board from '../../components/Board'
import logo from '../../logo.svg'
import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

const messages = [
  {
    "text": "Hello there",
    "id": "1",
    "sender": {
      "name": "Ironman",
      "uid": "user1",
      "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
]

function Play() {
  return (
    <Layout>
      <Layout.Header style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: '#fff',
        borderStyle: 'none none none none',
      }}>
        <Tooltip title='Leave your game'>
          <a id='logo' href='/'>
            <img alt='logo' src={logo} />
            X vs O
          </a>
        </Tooltip>
      </Layout.Header>
      <Layout.Content style={{ marginTop: 64, background: '#fff' }}>
        <div className="site-layout-background" >
          <Card style={{ width: 512, margin: 'auto' }} >
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
              <Typography.Text strong>X : You</Typography.Text>
              <Typography.Text strong>vs</Typography.Text>
              <Typography.Text strong>Oponent : O</Typography.Text>
            </div>
            <Divider dashed />
            <Board />
          </Card>
        </div>
      </Layout.Content>
      <Footer />

      <Widget
        title='Oponent'
        subtitle=''
      />
    </Layout>
  )
}

export default Play