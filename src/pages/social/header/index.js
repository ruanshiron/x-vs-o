import React from 'react'
import { Layout, Input, Col, Row, Typography, Space } from 'antd'
import { OrderedListOutlined } from '@ant-design/icons'
import logo from '../../../logo.svg'
import LinkButton from '../../../components/LinkButton'

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

function SocialHeader(props) {
  return (
    <Header style={headerStyle}>
      <Row>
        <Col xs={2} sm={4} md={6} lg={6} xl={6}>
          <Row>
            <Col offset={1}>
              <a id='logo' href='/'>
                <img alt='logo' src={logo} />
                  X vs O
                </a>
            </Col>
          </Row>
        </Col>
        <Col xs={20} sm={16} md={12} lg={12} xl={12}>
          <Row>
            <Col offset={1} flex="auto">
              <Input placeholder='Search User'></Input>
            </Col>
          </Row>
        </Col>
        <Col xs={2} sm={4} md={6} lg={6} xl={6}>
          <Row justify="end">
            <Col pull={1}>
              <Space>
                <LinkButton
                  to='/social'
                  type='dashed'
                  size='large'
                  icon={<OrderedListOutlined />}
                />
                <LinkButton to='/social/username' type="text" shape="round" size='large'>
                  <Typography.Text strong>username</Typography.Text>
                </LinkButton>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default SocialHeader