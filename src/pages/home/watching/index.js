import React from 'react'
import { Card, Input, Divider } from 'antd'


function Watching() {
  return (
    <div className="site-layout-background" >
      <Card style={{ maxWidth: 512, margin: 'auto' }} >
        <Input.Search
          placeholder="進行中の対戦のコードを入力"
          onSearch={value => console.log(value)}
          style={{margin: 'auto'}}
          enterButton
        />
        <Divider dashed/>
      </Card>
    </div>
  )
}

export default Watching