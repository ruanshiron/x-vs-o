import React, { useEffect } from 'react'
import { Card, Divider, Spin } from 'antd'
import Board from './Board'
import useGameState from '../hooks/useGameState'
import ChatBox from './ChatBox'
import TurnBar from './TurnBar'
import { useUser, SuspenseWithPerf } from 'reactfire'

const styleGameBoard = { maxWidth: 512, margin: 'auto' }

function BoardWithUser({ user }) {
  const { matchId } = useGameState(user)

  return (
    matchId && <Board />
  )
}

function GamePendingUser() {
  const user = useUser()

  return (
    user &&
    <>
      <Card style={styleGameBoard} >
        <TurnBar />
        <Divider dashed />
        <BoardWithUser user={user} />
      </Card>

      <ChatBox />
    </>
  )
}

function Game() {

  return (
    <SuspenseWithPerf
      traceId={'firebase-user-wait-for-game'}
      fallback={
        <Spin />
      }
    >
      <GamePendingUser />
    </SuspenseWithPerf>
  )
}

export default Game