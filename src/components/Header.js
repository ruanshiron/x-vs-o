import React from 'react'
import { Layout, Input, Col, Row, Typography, Space, Tooltip } from 'antd'
import { OrderedListOutlined, SettingOutlined } from '@ant-design/icons'
import logo from '../logo.svg'
import LinkButton from './LinkButton'
import { useRouteMatch } from 'react-router-dom'
import AuthStateButton from './AuthStateButton'

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
  let admin = true

  let matchDashboard = useRouteMatch('/dashboard')
  let matchSocial = useRouteMatch({
    path: '/social',
    exact: true
  })

  return (
    <Layout.Header style={headerStyle}>
      <Row>
        {
          search ?
            <>
              <Col xs={0} sm={0} md={6} lg={6} xl={6}>
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
                    <Input placeholder='ユーザーを検索'></Input>
                  </Col>
                </Row>
              </Col>
            </>
            :
            <>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Row>
                  <Col offset={1} flex='100%'>
                    <LinkButton type='primary' size='large' to='play'>
                      ニューゲーム
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

        <Col xs={11} sm={7} md={5} lg={5} xl={5} offset={1}>
          <Row justify="end">
            <Col pull={1}>
              <Space>
                {
                  admin &&
                  <Tooltip placement="bottom" title="ダッシュボード">
                    <LinkButton
                      type={matchDashboard?'primary':'dashed'}
                      size='large'
                      icon={<SettingOutlined />}
                      to='/dashboard'
                    />
                  </Tooltip>
                }
                <Tooltip placement="bottom" title="ランキング">
                  <LinkButton
                    type={matchSocial?'primary':'dashed'}
                    size='large'
                    icon={<OrderedListOutlined />}
                    to='/social'
                  />
                </Tooltip>

                <AuthStateButton />
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header