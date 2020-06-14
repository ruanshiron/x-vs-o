import React from 'react'

const MARK = { X: 0, O: 1}

function Square({onClick, disabled, mark,  ...rest}) {
  return (
    <button {...rest} className="btn btn-board" onClick={onClick} disabled={disabled}>
      <span className={mark === MARK.X ? "x" : mark === MARK.O? "o" : ""}></span>
    </button>
  )
}

export default Square