import React, { useEffect } from 'react'
import { SuspenseWithPerf, useUser } from 'reactfire'
import { Typography, Tooltip } from 'antd'
import LinkButton from './LinkButton'

function FirebaseAuthStateButton() {
  const user = useUser()

  useEffect(() => {
    console.log(user);
    
  }, [])

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
        'loading...'
      }
    >
      <FirebaseAuthStateButton />
    </SuspenseWithPerf>
  )
}

export default AuthStateButton