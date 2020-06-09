import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Typography, Divider } from 'antd'
import { Link, useLocation, useParams } from 'react-router-dom'
import History from './history'
import Stats from './stats'
import LogoutButton from '../../../components/LogoutButton'


const tabList = [
  {
    key: 'stats',
    tab: '統計',
  },
  {
    key: 'play-history',
    tab: '対戦履歴',
  }
]

const contentList = (key) => (props) => {
  switch (key) {
    case 'stats':
      return <Stats {...props} />

    default:
      return <History {...props} />
  }
}


function Profile(props) {
  let location = useLocation()
  let { username } = useParams()

  useEffect(() => {
    let p = location.search.match(/\?(\w)(=(\d+))?/)
    console.log(username);

    if (p)
      if (p[1] === 'p') {
        setKey('play-history')
        let page = parseInt(p[3])
        if (!isNaN(page)) {
          setHistoryDefaultPage(page)
        }
      }

  }, [location, username])

  const [key, setKey] = useState('stats')
  const [historyDefaultPage, setHistoryDefaultPage] = useState(1)

  return (
    <div className="site-layout-background" >
      <Card style={{ width: '100%', marginTop: 16 }} >
        <Row>
          <Col span={5}>
            <Row gutter={[0, 40]}>
              <img id='profile-avatar' src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' alt='avatar' />
            </Row>
            <Row>
              <Typography.Paragraph strong editable>username</Typography.Paragraph>
            </Row>
            <Row>
              <Typography.Paragraph strong >example@mail.com</Typography.Paragraph>
            </Row>
            <Row>
              <Link to="/login">パスワードを変更</Link>
            </Row>
            <Divider />
            <Row>
              <LogoutButton/>
            </Row>
          </Col>
          <Col span={18} offset={1}>
            <Card
              style={{ width: '100%', height: '100%' }}
              tabList={tabList}
              activeTabKey={key}
              onTabChange={key => {
                setKey(key)
              }}
            >
              {contentList(key)({ defaultPage: historyDefaultPage })}
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Profile