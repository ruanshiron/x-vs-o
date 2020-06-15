import React, { useState, useEffect, useContext } from 'react'
import { Card, Row, Col, Typography, Divider, Button } from 'antd'
import { useLocation, useParams } from 'react-router-dom'
import History from './history'
import Stats from './stats'
import LogoutButton from '../../../components/LogoutButton'
import useProfile from '../../../hooks/useProfile'
import ChangePasswordModal from '../../../components/ChangePasswordModal'
import { UserContext } from '../../../contexts/UserContextProvider'
import AvatarImage from '../../../components/AvatarImage'
import AvatarChangeButton from '../../../components/AvatarChangeButton'


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
  let { uid } = useParams()
  const { profile, changeDisplayName } = useProfile(uid)
  const [key, setKey] = useState('stats')
  const [visible, setVisible] = useState(false)
  const [historyDefaultPage, setHistoryDefaultPage] = useState(1)
  const [passwordIsChangeable, setPasswordIsChangeable] = useState(false)
  const { signedInUser } = useContext(UserContext)

  useEffect(() => {
    let p = location.search.match(/\?(\w)(=(\d+))?/)
    console.log(uid);

    if (p)
      if (p[1] === 'p') {
        setKey('play-history')
        let page = parseInt(p[3])
        if (!isNaN(page)) {
          setHistoryDefaultPage(page)
        }
      }

  }, [location, uid])

  useEffect(() => {
    if (signedInUser?.uid === uid && signedInUser?.providerData[0].providerId === "password")
      setPasswordIsChangeable(true)
    else
      setPasswordIsChangeable(false)
  }, [signedInUser, uid])


  const onFinishedChangeDisplayName = (value) => {
    changeDisplayName(value)
  }

  const showChangePasswordModal = () => {
    setVisible(true)
  }

  return (
    <div className="site-layout-background" >
      <Card style={{ width: '100%', marginTop: 16 }} >
        <Row>
          <Col span={5}>
            <Row justify='center'>
              <AvatarImage src={(signedInUser?.uid === uid) ? signedInUser.photoURL : profile.photoURL} />
            </Row>
            <Row>
              <Typography.Paragraph strong editable={(signedInUser?.uid === uid) && { onChange: (value) => { onFinishedChangeDisplayName(value) } }}>{profile.displayName}</Typography.Paragraph>
            </Row>
            <Row>
              <Typography.Paragraph strong >{profile.email}</Typography.Paragraph>
            </Row>
            {
              passwordIsChangeable &&
              <>
                <Divider />
                <Row>
                  <AvatarChangeButton user={signedInUser} />
                  <Button type='dashed' block onClick={() => showChangePasswordModal()}>パスワードを変更</Button>
                </Row>
              </>
            }
            <Divider />
            <Row>
              <LogoutButton />
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

      <ChangePasswordModal visible={visible} handleCancel={() => setVisible(false)} />
    </div>
  )
}

export default Profile