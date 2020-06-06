import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

function LinkButton({children, to, ...rest}) {
  let history = useHistory()
  return ( 
    <Button
      {...rest}
      onClick={(e) => {
        history.push(to)
      }}
    >
      {children}
    </Button>
  )
}

export default LinkButton