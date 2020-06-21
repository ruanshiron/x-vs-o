import React, { useContext } from 'react'
import { Typography, Tooltip, Avatar } from 'antd'
import LinkButton from './LinkButton'
import { UserContext } from '../contexts/UserContextProvider'
import { Link } from 'react-router-dom'

function AuthStateButton() {
  const { signedInUser } = useContext(UserContext)

  return (
    signedInUser ?
      // <Tooltip placement="bottom" title={signedInUser.displayName}>
        <Link to={`/social/${signedInUser.uid}`}>
          <Avatar src={signedInUser.photoURL ? signedInUser.photoURL : 'https://ombud.alaska.gov/wp-content/uploads/2018/01/no-user.jpg'} size="large" />
        </Link>
      // </Tooltip>
      :
      <Tooltip placement="bottom" title="ログイン">
        <LinkButton to='/login' type="default" size='large'>
          <Typography.Text strong>ログイン</Typography.Text>
        </LinkButton>
      </Tooltip>
  )
}

export default AuthStateButton