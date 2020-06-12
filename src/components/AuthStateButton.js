import React, { useContext } from 'react'
import { Typography, Tooltip } from 'antd'
import LinkButton from './LinkButton'
import { UserContext } from '../contexts/UserContextProvider'

function AuthStateButton(props) {
  const { signedInUser } = useContext(UserContext)
  
  return (
    signedInUser ?
      <Tooltip placement="bottom" title="プロフィール">
        <LinkButton to={`/social/${signedInUser.uid}`} type="text" shape="round" size='large'>
          <Typography.Text strong>{signedInUser.displayName}</Typography.Text>
        </LinkButton>
      </Tooltip>
      :
      <Tooltip placement="bottom" title="ログイン">
        <LinkButton to='/login' type="default" size='large'>
          <Typography.Text strong>ログイン</Typography.Text>
        </LinkButton>
      </Tooltip>
  )
}

export default AuthStateButton