import React, { useEffect } from 'react'
import { Card, Divider, Spin } from 'antd'
import Board from './Board'
import useGameState from '../hooks/useGameState'
import TurnBar from './TurnBar'
import { LoadingOutlined } from '@ant-design/icons'

const styleGameBoard = { maxWidth: 512, margin: 'auto' }

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Game() {

  const { match } = useGameState()

  useEffect(() => {
    console.log(match)
  }, [match])

  return (
    <Card style={styleGameBoard} >
      {
        match ?
          <>
            <TurnBar />
            <Divider dashed />
            <Board match={match} />
          </>
          :
          <Spin style={{ margin: 'auto' }} indicator={antIcon} />
      }
    </Card>
  )
}



export default Game