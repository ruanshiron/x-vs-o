

function checker(board, criteria, [currentX, currentY], step) {
  let current = board[currentX][currentY], count = 0, range = []

  for (let c = - criteria + 1; c < criteria; c++) range.push(c)

  for (const c of range) {
    const [i, j] = step(c)

    if (board[i] !== undefined)
      if (board[i][j] !== undefined) {
        if (board[i][j] !== current) count = 0
        else count++
        if (count === criteria) return true
      }
  }

  return false
}

function won(board, criteria, [i, j]) {
  let r = checker(board, criteria, [i, j], (step) => [i + step, j + step]) || checker(board, criteria, [i, j], (step) => [i, j - step]) || checker(board, criteria, [i, j], (step) => [i + step, j - step]) || checker(board, criteria, [i, j], (step) => [i + step, j])
  return r
}

function init_board() {
  const SIZE = 15
  let r = []
  for (let i = 0; i < SIZE; i++) {
    r.push(Array(SIZE).fill(null))
  }
  return r
}

exports.won = won
exports.init_board = init_board