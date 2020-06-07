
import React from 'react'
import { Layout, Card, Tag, Table } from 'antd'
import DashboardHeader from '../../components/Header'
import Footer from '../../components/Footer'

const contentStyle = { marginTop: 64, background: '#fff' }

const data = [
  
]

for (let index = 0; index < 200; index++) {
  data.push({
    name: `example${index}`,
    top: 42,
    email: `example${index}@example.com`,
    wins: 12,
    losses: 123,
    point: 120
  })
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Top',
    dataIndex: 'top',
    key: 'top',
    render: (top) => (
      <Tag>
        {top}
      </Tag>
    )
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Wins',
    key: 'wins',
    dataIndex: 'wins'
  },
  {
    title: 'Losses',
    key: 'losses',
    dataIndex: 'losses'
  },
  {
    title: 'Point',
    key: 'point',
    dataIndex: 'point'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Block</a>
      </span>
    ),
  },
];

function Dashboard() {
  return (
    <Layout>
      <DashboardHeader search />
      <Layout.Content style={contentStyle}>
        <div className="site-layout-background" >
          <Card style={{ width: '100%', marginTop: 16 }} >
            <Table
              columns={columns}
              pagination={{ position: ['topLeft', 'bottomRight'] }}
              dataSource={data}
            />
          </Card>
        </div>
      </Layout.Content>
      <Footer/>
    </Layout>
  )
}

export default Dashboard