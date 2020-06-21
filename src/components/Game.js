import React, { useEffect } from 'react'
import { Spin } from 'antd'
import Board from './Board'
import useGameState from '../hooks/useGameState'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Game() {

  const { match } = useGameState()

  useEffect(() => {
    console.log(match)
  }, [match])

  return (
    <div className='game-wrapper'>
      {
        match ?
          <>
            <Board match={match} />
          </>
          :
          <Spin style={{ margin: 'auto' }} indicator={antIcon} />
      }
    </div>
  )
}



export default Game