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

const routes = [
  {
    path: '/',
    exact: true,
    component: <Home />
  },
  {
    path: '/dashboard',
    exact: false,
    component: <Dashboard />
  },
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
  {
    path: '/social',
    exact: false,
    component: <Social />
  },
  {
    path: '/play',
    exact: false,
    component: <Play />
  }
]

function App() {

  return (
    <UserContextProvider>
      <Router>
        <Switch>
          {
            routes.map(({ component, ...rest }, i) =>
              <Route {...rest} key={i}>
                { component }
              </Route>
            )
          }
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
