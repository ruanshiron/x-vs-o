import React from 'react'
import { Layout, Input, Col, Row, Space, Tooltip } from 'antd'
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

function DashboardButton({ match }) {
  return (
    <Tooltip placement="bottom" title="ダッシュボード">
      <LinkButton
        type={match ? 'primary' : 'dashed'}
        size='large'
        icon={<SettingOutlined />}
        to='/dashboard'
      />
    </Tooltip>
  )
}

function RankingButton({ match }) {
  return (
    <Tooltip placement="bottom" title="ランキング">
      <LinkButton
        type={match ? 'primary' : 'dashed'}
        size='large'
        icon={<OrderedListOutlined />}
        to='/social'
      />
    </Tooltip>
  )
}

function Logo(params) {
  return (
    <a id='logo' href='/'>
      <img alt='logo' src={logo} />
      X vs O
    </a>
  )
}



function Header({ hasLogo, hasNewGameButton, hasOtherButton, hasSearchBar }) {
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
          hasNewGameButton &&
          <Col xs={3} sm={3} md={6} lg={6} xl={6}>
            <Row>
              <Col offset={1}>
                <LinkButton type='primary' size='large' to='play'>ニューゲーム</LinkButton>
              </Col>
            </Row>
          </Col>
        }

        {
          hasLogo &&
          <Col xs={0} sm={0} md={6} lg={6} xl={6}>
            <Row>
              <Col offset={1}>
                <Logo />
              </Col>
            </Row>
          </Col>
        }

        {
          hasSearchBar &&
          <Col xs={8} sm={8} md={12} lg={12} xl={12}>
            <Row>
              <Col offset={1} flex="auto">
                <Input placeholder='ユーザーを検索'></Input>
              </Col>
            </Row>
          </Col>
        }

        {
          hasOtherButton &&
          <Col xs={8} sm={8} md={5} lg={5} xl={5} offset={1}>
            <Row justify="end">
              <Col pull={1}>
                <Space>
                  {admin && <DashboardButton match={matchDashboard} />}
                  <RankingButton match={matchSocial} />
                  <AuthStateButton />
                </Space>
              </Col>
            </Row>
          </Col>
        }

      </Row>
    </Layout.Header>
  )
}

export default Header