import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Home from './pages/home'
import Login from './pages/login'
import Play from './pages/play'
import SignUp from './pages/signup'
import Social from './pages/social'
import Dashboard from './pages/dashboard'

import './style.css'
import UserContextProvider from './contexts/UserContextProvider'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import LoginRoute from './components/LoginRoute'

const routes = [
  {
    path: '/',
    exact: true,
    component: <Home />
  },
  {
    path: '/social',
    exact: false,
    component: <Social />
  }
]

const loginRoutes = [
  {
    path: '/login',
    exact: false,
    component: <Login />
  },
  {
    path: '/signup',
    exact: false,
    component: <SignUp />
  },
]

function App() {

  return (
    <UserContextProvider>
      <Router>
        <Switch>
          {
            routes.map(({ component, ...rest }, i) =>
              <Route {...rest} key={i}>
                {component}
              </Route>
            )
          }
          {
            loginRoutes.map(({ component, ...rest }, i) =>
              <LoginRoute {...rest} key={i}>
                {component}
              </LoginRoute>
            )
          }
          <PrivateRoute path='/play'>
            <Play />
          </PrivateRoute>

          <AdminRoute path='/dashboard'>
            <Dashboard />
          </AdminRoute>

        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
