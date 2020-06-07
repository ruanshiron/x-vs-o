import { useState, useEffect} from 'react'; 
import { functions } from 'firebase';

// TODO: Firebase here 

function deepClone(array){
  return JSON.parse(JSON.stringify(array))
}

function init_board() {
  const SIZE = 15
  let r = []
  for (let i = 0; i < SIZE; i++) {
    r.push(Array(SIZE).fill(null))
  }
  return r
}
function useBoard() {

  const [board, setBoard] = useState(init_board())
  const [history, setHistory] = useState([])
  const [mark, setMark] = useState(false)

  useEffect(() => {
    setHistory([...history, board])
    console.log(board);
    setMark(!mark)
  }, [board])

  function move(x, y) {
    if (board[x][y] !== null)
      return
    board[x][y] = mark
    setBoard(deepClone(board))
  }
  
  return {
    board,
    move
  }
}

export default useBoard