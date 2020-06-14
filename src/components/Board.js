import React from 'react'
import Square from './Square'
import TurnBar from './TurnBar'
import { Divider } from 'antd'
import useBoardState from '../hooks/useBoardState'


function Board({ match }) {
  const { board, move, isYourTurn, mark } = useBoardState(match)
  return (
    <>
      <TurnBar 
        isYourTurn={isYourTurn}
        mark={mark}
      />
      <Divider dashed />
      <div className="board-container">
        <div className="board">
          {
            board.map((x, i) => (
              <div
                key={i}
                className="board-row"
              >
                {
                  x.map((sx, j) => (
                    <Square
                      key={j}
                      mark={sx}
                      onClick={() => move(i, j)}
                    // disabled={winner != null ? true : false}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Board