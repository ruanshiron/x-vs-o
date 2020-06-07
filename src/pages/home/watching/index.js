import React from 'react'
import { Card, Input, Divider } from 'antd'
import Board from '../../../components/Board'


function Watching() {
  return (
    <div className="site-layout-background" >
      <Card style={{ width: 512, margin: 'auto' }} >
        <Input.Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{margin: 'auto'}}
          enterButton
        />
        <Divider dashed/>
        <Board />
      </Card>
    </div>
  )
}

export default Watching