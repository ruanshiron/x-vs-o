import React, { useEffect } from 'react'
import { Layout } from 'antd'
import './style.css'
import SocialHeader from './header'
import Profile from './profile'
import { Switch, Route, useLocation } from 'react-router-dom'
import Rankings from './rankings'
import Footer from '../../components/Footer'

const { Content } = Layout

const contentStyle = { marginTop: 64, background: '#fff' }

function Social() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])
  return (
    <Layout>
      <SocialHeader />
      <Content style={contentStyle}>
        <Switch>
          <Route path="/social/:username">
            <Profile />
          </Route>
          <Route path="/social">
            <Rankings />
          </Route>
        </Switch>
      </Content>

      <Footer/>

    </Layout>
  )
}

export default Social