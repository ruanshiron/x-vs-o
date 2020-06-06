import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Play from './pages/play';
import Signup from './pages/signup';
import Social from './pages/social';
import Dashboard from './pages/dashboard';

import './style.css'

function App() {
  return (
    <Router>
      <div>
{/* 
        <ul>
          <li>
            <Link exact to="/">Top page</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/play">Matching</Link>
          </li>
          <li>
            <Link to="/social">Social (trang bao gồm tìm kiếm, rank, profile)</Link>
          </li>
          <li>
            <Link to="/dashboard">Admin Page</Link>
          </li>
        </ul>
        <p>Khu vực sẽ xóa</p>
        <hr/> */}

        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/play">
            <Play/>
          </Route>
          <Route path="/social">
            <Social/>
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
