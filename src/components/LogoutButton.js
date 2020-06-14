import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'

function LogoutButton(props) {
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