import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  useFirebaseApp,
  preloadAuth,
  preloadFirestore,
  preloadDatabase,
  preloadStorage,
  preloadRemoteConfig
} from 'reactfire';
import Home from './pages/home';
import Login from './pages/login';
import Play from './pages/play';
import Signup from './pages/signup';
import Social from './pages/social';
import Dashboard from './pages/dashboard';

import './style.css'

const preloadSDKs = firebaseApp => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence(/*{ synchronizeTabs: true }*/);
      }
    }),
    preloadDatabase({ firebaseApp }),
    preloadStorage({
      firebaseApp,
      setup(storage) {
        return storage().setMaxUploadRetryTime(10000);
      }
    }),
    preloadAuth({ firebaseApp }),
    preloadRemoteConfig({
      firebaseApp,
      setup(remoteConfig) {
        remoteConfig().settings = {
          minimumFetchIntervalMillis: 10000,
          fetchTimeoutMillis: 10000
        };
        return remoteConfig().fetchAndActivate();
      }
    })
  ]);
};

function App() {
  const firebaseApp = useFirebaseApp();
  preloadSDKs(firebaseApp)
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/social">
          <Social />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
