import React from 'react'

function Square({onClick, disabled, mark}) {
  return (
    <button className="btn btn-board" onClick={onClick} disabled={disabled}>
      <span className={mark === false? "x" : mark === true? "o" : ""}></span>
    </button>
  )
}

export default Square