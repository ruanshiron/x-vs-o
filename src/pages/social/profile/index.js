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
      <Row gutter={[16, 32]}>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Card style={{ width: '100%'}} >
            <Row justify='center'>
              <AvatarImage src={(signedInUser?.uid === uid) ? signedInUser.photoURL : profile.photoURL} />
            </Row>
            <Row justify='center'>
              <Typography.Paragraph strong editable={(signedInUser?.uid === uid) && { onChange: (value) => { onFinishedChangeDisplayName(value) } }}>{profile.displayName}</Typography.Paragraph>
            </Row>
            <Row justify='center'>
              <Typography.Paragraph strong >{profile.email}</Typography.Paragraph>
            </Row>
            {
              passwordIsChangeable &&
              <>
                <Row>
                  <AvatarChangeButton user={signedInUser} />
                  <Button type='dashed' block onClick={() => showChangePasswordModal()}>パスワードを変更</Button>
                </Row>
              </>
            }
            
            {
              signedInUser?.uid === uid &&
              <Row>
                <Divider />
                <LogoutButton />
              </Row>
            }

          </Card>
        </Col>

        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
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

      <ChangePasswordModal setVisible={setVisible} visible={visible} handleCancel={() => setVisible(false)} />
    </div>
  )
}

export default Profile