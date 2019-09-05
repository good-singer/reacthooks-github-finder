import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

import GithubState from './context/github/GithubState'
import AlertState from './context/alert/alertState'

import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])



  const getUser = async login => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${login}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  }

  const getUserRepos = async login => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }



  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" render={props => (
                  <Fragment>
                    <Search
                      showClear={users.length > 0 ? true : false}
                      clearUsers={clearUsers}
                    />
                    <Users
                      loading={loading}
                      users={users}
                    />
                  </Fragment>
                )} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={getUserRepos}
                    repos={repos}
                  />
                )} />
              </Switch>
            </div>

          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App;
