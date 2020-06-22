import React, { useContext } from 'react'
import { Layout, Col, Row, Space, Tooltip } from 'antd'
import { OrderedListOutlined, SettingOutlined } from '@ant-design/icons'
import logo from '../logo.svg'
import LinkButton from './LinkButton'
import { useRouteMatch } from 'react-router-dom'
import AuthStateButton from './AuthStateButton'
import { UserContext } from '../contexts/UserContextProvider'
import SearchInput from './SearchInput'

const headerStyle = {
  position: 'fixed',
  zIndex: 1,
  width: '100%',
  background: '#fff',
  borderStyle: 'none none solid none',
  borderWidth: '0.5px',
  borderColor: '#F0F0F0',
  paddingLeft: 24,
  paddingRight: 24
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

function Logo() {
  return (
    <a id='logo' href='/'>
      <img alt='logo' src={logo} />
        X vs O
    </a>

  )
}

function Header() {
  const { signedInUser } = useContext(UserContext)

  let matchDashboard = useRouteMatch({ path: '/dashboard', exact: false })
  let matchSocial = useRouteMatch({ path: '/social', exact: true })
  let matchHome = useRouteMatch({ path: '/', exact: true })
  let matchPlay = useRouteMatch({ path: '/play', exact: false })

  return (
    <Layout.Header style={headerStyle}>
      <Row justify="space-between">
        {
          matchHome ?
            <>
              <Col xs={4}>
                <LinkButton type='primary' size='large' to='/play'>ニューゲーム</LinkButton>
              </Col>
              <Logo />
            </>
            :
            <Logo />
        }

        {
          !(matchHome || matchPlay) &&
          <Col flex='1'>
            <Row justify='center'>
              <Col>
                <SearchInput />
              </Col>
            </Row>
          </Col>
        }

        {
          !matchPlay &&
          <Col flex='160px'>
            <Row justify="end">
              <Space>
                <AuthStateButton />
                <RankingButton match={matchSocial} />
                {(signedInUser && signedInUser.role > 0) && <DashboardButton match={matchDashboard} />}
              </Space>
            </Row>
          </Col>
        }

      </Row>
    </Layout.Header >
  )
}

export default Header