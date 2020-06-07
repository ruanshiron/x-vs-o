import React from 'react'
import Square from './Square'
import useBoard from '../hooks/useBoard'


function Board() {
  const {board, move} = useBoard()
  return (
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
                    onClick={(e) => {
                      console.log(i +''+ j);
                      
                      move(i, j)
                    }}
                    // disabled={winner != null ? true : false}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Board