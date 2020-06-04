import React from 'react'
import { Card, List, Typography, Col, Row } from 'antd'
import { Link } from 'react-router-dom';

const data = [
  
];

for (let index = 0; index < 100; index++) {
  data.push({
    username: 'vinh'+index,
    losses: 102,
    wins: 143+1*index,
    point: 2013+index*10
  })
}

function RankingItem({top, username, losses, wins, point}) {
  let size = top > 1 ? top > 3 ? 4 : 3 : 2
  return (
    <List.Item>
      <Row style={{ width: '100%' }}>
        <Col span={6}>
          <Typography.Title level={size}>{top}.  <Link to={`/social/${username}`}>{username}</Link></Typography.Title>
        </Col>
        <Col span={6}>
          <Row justify='end' align='bottom'>
            <Typography.Title level={size}>{losses} </Typography.Title>
            <Typography.Paragraph>負け</Typography.Paragraph>
          </Row>
        </Col>
        <Col span={6}>
          <Row justify='end' align='bottom'>
            <Typography.Title level={size}>{wins}</Typography.Title>
            <Typography.Paragraph>勝ち</Typography.Paragraph>
          </Row>
        </Col>
        <Col span={6}>
          <Row justify='end' align='bottom'>
            <Typography.Title level={size}>{point}</Typography.Title>
            <Typography.Paragraph>ポイント</Typography.Paragraph>
          </Row>
        </Col>
      </Row>
    </List.Item>
  )
}

function Rankings(props) {
  return (
    <div className="site-layout-background" >
      <Card style={{ width: '100%', marginTop: 16 }} >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, i) => (
            <RankingItem
              top={i+1}
              username={item.username}
              losses={item.losses}
              wins={item.wins}
              point={item.point}
            />
          )}
        />
      </Card>
    </div>
  )
}

export default Rankings