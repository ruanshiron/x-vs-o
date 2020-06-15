import React, { useContext } from 'react'
import { Typography } from 'antd'
import { UserContext } from '../contexts/UserContextProvider'

function TurnBar(props) {
  const { isYourTurn, mark } = props
  const { signedInUser } = useContext(UserContext)

  return (
    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
      <Typography.Text strong>{isYourTurn ? `『${mark === 1 ? 'Ｏ' : 'Ｘ'}：${signedInUser.displayName}』` : `　${mark === 1 ? 'Ｏ' : 'Ｘ'} : ${signedInUser.displayName}　`}</Typography.Text>
      {/* <Typography.Text strong>ｖｓ</Typography.Text> */}
      <Typography.Text strong>{!isYourTurn ? `『${!(mark === 1) ? 'Ｏ' : 'Ｘ'}』` : `　${!(mark === 1) ? 'Ｏ' : 'Ｘ'}　`}</Typography.Text>
    </div>
  )
}

export default TurnBar