import React from 'react'
import { Layout, Input, Col, Row, Typography, Space, Tooltip } from 'antd'
import { OrderedListOutlined, SettingOutlined } from '@ant-design/icons'
import logo from '../logo.svg'
import LinkButton from './LinkButton'

const headerStyle = {
  position: 'fixed',
  zIndex: 1,
  width: '100%',
  background: '#fff',
  borderStyle: 'none none solid none',
  borderWidth: '0.5px',
  borderColor: '#F0F0F0'
}

function Header({ search }) {
  let auth, admin = true
  return (
    <Layout.Header style={headerStyle}>
      <Row>
        {
          search ?
            <>
              <Col xs={0} sm={6} md={6} lg={6} xl={6}>
                <Row>
                  <Col offset={1}>
                    <a id='logo' href='/'>
                      <img alt='logo' src={logo} />
                  X vs O
                </a>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Row>
                  <Col offset={1} flex="auto">
                    <Input placeholder='Search User'></Input>
                  </Col>
                </Row>
              </Col>
            </>
            :
            <>
              <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Row>
                  <Col offset={1} flex='100%'>
                    <LinkButton type='primary' size='large' to='play'>
                      NEW GAME
              </LinkButton>
                  </Col>
                </Row>
              </Col>
              <Col xs={0} sm={8} md={12} lg={12} xl={12}>
                <Row>
                  <Col offset={1} flex="auto">
                    <Row justify='center'>
                      <a id='logo' href='/'>
                        <img alt='logo' src={logo} />
                X vs O
              </a>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </>
        }

        <Col xs={12} sm={8} md={6} lg={6} xl={6}>
          <Row justify="end">
            <Col pull={1}>
              <Space>
                {
                  admin &&
                  <Tooltip placement="bottom" title="ダッシュボード">
                    <LinkButton
                      type='dashed'
                      size='large'
                      icon={<SettingOutlined />}
                      to='/dashboard'
                    />
                  </Tooltip>
                }
                <Tooltip placement="bottom" title="ランキング">
                  <LinkButton
                    type='dashed'
                    size='large'
                    icon={<OrderedListOutlined />}
                    to='/social'
                  />
                </Tooltip>

                {
                  auth ?
                    <Tooltip placement="bottom" title="プロフィール">
                      <LinkButton to='/social/username' type="text" shape="round" size='large'>
                        <Typography.Text strong>username</Typography.Text>
                      </LinkButton>
                    </Tooltip>
                    :
                    <Tooltip placement="bottom" title="ログイン">
                      <LinkButton to='/social/username' type="default" size='large'>
                        <Typography.Text strong>LOGIN</Typography.Text>
                      </LinkButton>
                    </Tooltip>
                }
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header