import React from 'react'
import { Typography } from 'antd'

function GameState() {
  return (
    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
      <Typography.Text strong>X : You</Typography.Text>
      <Typography.Text strong>vs</Typography.Text>
      <Typography.Text strong>Oponent : O</Typography.Text>
    </div>
  )
}

export default GameState