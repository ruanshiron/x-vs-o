import React, { useContext, useEffect } from 'react'
import { Card, Divider } from 'antd'
import Board from './Board'
import useGameState from '../hooks/useGameState'
import ChatBox from './ChatBox'
import TurnBar from './TurnBar'
import { UserContext } from '../contexts/UserContextProvider'

const styleGameBoard = { maxWidth: 512, margin: 'auto' }


function Game() {
  const { signedInUser } = useContext(UserContext)

  const { matchId } = useGameState(signedInUser)

  useEffect(() => {
    console.log(matchId)
  }, [matchId])

  return (
    <>
      <Card style={styleGameBoard} >
        {
          matchId &&
          <>
            <TurnBar />
            <Divider dashed />
            <Board matchId={matchId}/>
          </>
        }
      </Card>

      <ChatBox />
    </>
  )
}



export default Game