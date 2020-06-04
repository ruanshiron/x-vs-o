import React, { useState } from 'react'
import { Card, Avatar, Row, Col, Typography, Button, Divider } from 'antd'
import { Link } from 'react-router-dom'
import History from './history'
import Stats from './stats'

const { Meta } = Card

const tabList = [
  {
    key: 'stats',
    tab: 'Thống kê',
  },
  {
    key: 'play-history',
    tab: 'Lịch sử đấu',
  }
]

const contentList = {
  'stats': <Stats/>,
  'play-history': <History/>
}


function Profile(props) {
  const [key, setKey] = useState('stats')

  return (
    <div className="site-layout-background" >
      <Card style={{ width: '100%', marginTop: 16 }} >
        <Row>
          <Col span={5}>
            <Row gutter={[0, 40]}>
              <img id='profile-avatar' src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
            </Row>
            <Row>
              <Typography.Paragraph strong editable>username</Typography.Paragraph>
            </Row>
            <Row>
              <Typography.Paragraph strong >example@mail.com</Typography.Paragraph>
            </Row>
            <Row>
              <Link to="/login" strong>change passsword</Link>
            </Row>
            <Divider/>
            <Row>
              <Button type='dashed' danger style={{width: '100%'}}>Logout</Button>
            </Row>
          </Col>
          <Col span={18} offset={1}>
            <Card
              style={{ width: '100%', height: '100%' }}
              tabList={tabList}
              activeTabKey={key}
              onTabChange={key => {
                setKey(key);
              }}
            >
              {contentList[key]}
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Profile