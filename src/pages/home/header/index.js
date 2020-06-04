import React from 'react'
import { Layout, Col, Row, Button, Typography, Space } from 'antd'
import { Link } from 'react-router-dom'
import { OrderedListOutlined } from '@ant-design/icons'
import logo from '../../../logo.svg'

const { Header } = Layout

const headerStyle = {
  position: 'fixed',
  zIndex: 1,
  width: '100%',
  background: '#fff',
  borderStyle: 'none none solid none',
  borderWidth: '0.5px',
  borderColor: '#F0F0F0'
}

function HomeHeader(props) {
  return (
    <Header style={headerStyle}>
      <Row>
        <Col xs={2} sm={4} md={6} lg={6} xl={6}>
          <Row>
            <Col offset={1} flex='100%'>
              <Link to='/play'>
                <Button type='primary' size='large' primary>
                   PLAY
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs={20} sm={16} md={12} lg={12} xl={12}>
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
        <Col xs={2} sm={4} md={6} lg={6} xl={6}>
          <Row justify="end">
            <Col pull={1}>
              <Space>
                <Link to='/social'>
                  <Button
                    type='dashed'
                    size='large'
                    icon={<OrderedListOutlined />}
                  />
                </Link>
                <Link to='/social/username'>
                  <Button type="text" shape="round" size='large'>
                    <Typography.Text strong>username</Typography.Text>
                  </Button>
                </Link>

              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default HomeHeader