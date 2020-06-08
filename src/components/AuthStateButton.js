import React from 'react'
import { SuspenseWithPerf, useUser } from 'reactfire'
import { Typography, Tooltip, Spin } from 'antd'
import LinkButton from './LinkButton'

function FirebaseAuthStateButton() {
  const user = useUser()

  return !user ?
    <Tooltip placement="bottom" title="ログイン">
      <LinkButton to='/login' type="default" size='large'>
        <Typography.Text strong>ログイン</Typography.Text>
      </LinkButton>
    </Tooltip>
    :
    <Tooltip placement="bottom" title="プロフィール">
      <LinkButton to={`/social/${user.uid}`} type="text" shape="round" size='large'>
        <Typography.Text strong>{user.displayName}</Typography.Text>
      </LinkButton>
    </Tooltip>
}

function AuthStateButton(props) {
  return (
    <SuspenseWithPerf
      traceId={'firebase-user-wait'}
      fallback={
        <Spin/>
      }
    >
      <FirebaseAuthStateButton />
    </SuspenseWithPerf>
  )
}

export default AuthStateButton