import React, { useContext, useEffect } from 'react'
import { Typography } from 'antd'
import { UserContext } from '../contexts/UserContextProvider'
import { firestore, auth } from '../firebase'

function TurnBar(props) {
  const { isYourTurn, mark } = props
  const { signedInUser } = useContext(UserContext)

  return (
    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
      <Typography.Text strong>{isYourTurn ? `[${mark === 1 ? 'O' : 'X'} : ${signedInUser.displayName}]` : `${mark === 1 ? 'O' : 'X'} : ${signedInUser.displayName}`}</Typography.Text>
      <Typography.Text strong>vs</Typography.Text>
      <Typography.Text strong>{!isYourTurn ? `[${!(mark === 1) ? 'O' : 'X'} : Oponent]` : `${!(mark === 1) ? 'O' : 'X'} : Oponent`}</Typography.Text>
    </div>
  )
}

export default TurnBar