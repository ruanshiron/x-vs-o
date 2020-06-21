import React from 'react'
import { Layout, List, Avatar, Pagination } from 'antd'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import useSearch from '../../hooks/useSearch'
import { Link } from 'react-router-dom'

const contentStyle = { marginTop: 64, background: '#fff' }

export default function Search() {
  const { result, nbHits, page, onChangePage, PAGESIZE } = useSearch()

  return (
    <Layout>
      <Header />
      <Layout.Content style={contentStyle}>
        <div style={{ maxWidth: 500 }} className="site-layout-background" >
          <List
            itemLayout="horizontal"
            dataSource={result}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.photoURL ? item.photoURL : 'https://ombud.alaska.gov/wp-content/uploads/2018/01/no-user.jpg'} />}
                  title={<Link to={`/social/${item.objectID}`}>{item.displayName}</Link>}
                  description={item.email}
                />
                {/* <Tag>Top: {item.rank}</Tag> */}
              </List.Item>
            )}
          />
          {nbHits > 0 && <Pagination current={page + 1} total={nbHits} pageSize={PAGESIZE} onChange={onChangePage} />}
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  )
}