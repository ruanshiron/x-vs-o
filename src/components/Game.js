import React, { useEffect } from 'react'
import { Card, Spin } from 'antd'
import Board from './Board'
import useGameState from '../hooks/useGameState'
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
            <Board match={match} />
          </>
          :
          <Spin style={{ margin: 'auto' }} indicator={antIcon} />
      }
    </Card>
  )
}



export default Game