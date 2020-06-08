import React from 'react'
import { Button } from 'antd'
import { useAuth } from 'reactfire'
import { useHistory } from 'react-router-dom'

function LogoutButton(props) {
  const auth = useAuth()
  const history = useHistory()
  return (
    <Button 
      type='dashed' 
      danger 
      block
      onClick={e => {
        auth
          .signOut()
          .then(() => history.replace('/'))
      }}
    >
      ログアウト
    </Button>
  )
}

export default LogoutButton