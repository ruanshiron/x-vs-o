import React, { useState } from 'react'
import { Layout, Card, Divider, Typography, Tooltip, Spin, Switch } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Footer from '../../components/Footer'
import Board from '../../components/Board'
import logo from '../../logo.svg'
import { Widget, addResponseMessage } from 'react-chat-widget'

import 'react-chat-widget/lib/styles.css'

const spinIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />

function Play() {

  const [matching, setMatching] = useState(true)

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    addResponseMessage('Welcome to this awesome chat!');
  }

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
          {
            matching ?
              <Spin style={{ marginTop: 64 }} size='large' indicator={spinIcon} />
              :
              <Card style={{ maxWidth: 512, margin: 'auto' }} >
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                  <Typography.Text strong>X : You</Typography.Text>
                  <Typography.Text strong>vs</Typography.Text>
                  <Typography.Text strong>Oponent : O</Typography.Text>
                </div>
                <Divider dashed />
                <Board />
              </Card>
          }

        </div>
      </Layout.Content>
      <Footer>
        <Switch checkedChildren="matching" unCheckedChildren="unmatching" defaultChecked onChange={() => setMatching(m => !m)} />
      </Footer>
      {
        !matching &&
        <Widget
          title='Oponent'
          subtitle=''
          handleNewUserMessage={handleNewUserMessage}
        />
      }

    </Layout>
  )
}

export default Play