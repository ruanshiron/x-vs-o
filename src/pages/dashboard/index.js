import React from 'react'
import { Layout, Tag, Table, Button } from 'antd'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DemoControl from '../../components/DemoControl'
import useDashboard from '../../hooks/useDashboard'

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
    dataIndex: 'displayName',
    key: 'displayName',
    render: (text, record) => <Link to={`/social/${record.uid}`}>{text}</Link>,
    fixed: 'left',
    sorter: (a, b) => a.displayName?.localeCompare(b.displayName),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    render: (rank) => (
      <Tag>
        {rank}
      </Tag>
    ),
    sorter: (a, b) => a.rank - b.rank,
    sortDirections: ['descend', 'ascend'],
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
    title: 'Matches',
    key: 'matches',
    dataIndex: 'matches'
  },
  {
    title: 'ELO',
    key: 'elo',
    dataIndex: 'elo'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type='link' onClick={() => record.handleBlock(!record.blocked)}>{record.blocked ? 'Unblock' : 'Block'}</Button>
      </span>
    ),
    width: 128
  },
];

function Dashboard() {
  const { isPending, users } = useDashboard()
  return (
    <Layout>
      <Header />
      <Layout.Content style={contentStyle}>
        <div className="site-layout-background" >
          <DemoControl />
          <br/>
          <div className="main-wrapper">
            <Table
              loading={isPending}
              columns={columns}
              pagination={{ position: ['topLeft', 'bottomRight'] }}
              dataSource={users}
              rowKey={(record) => record.email}
              scroll={{ x: true }}
            />
          </div>
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  )
}

export default Dashboard