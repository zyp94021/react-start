import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '@pages/login/Login'
import Home from '@pages/home/Home'
import AppData from './AppData'
import eventBus from './EventBus'
import { hot } from 'react-hot-loader'
import './App.less'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { token: localStorage.getItem('token') }
  }
  componentDidMount() {
    eventBus.addEventListener('login', ({ username, token }) => {
      AppData.token = token
      AppData.username = username
      localStorage.setItem('token', AppData.token)
      this.setState({
        token: AppData.token,
      })
    })
    eventBus.addEventListener('logout', () => {
      AppData.token = ''
      localStorage.removeItem('token')
      this.setState({
        token: AppData.token,
      })
    })
    const token = localStorage.getItem('token')
    if (token) {
      AppData.token = token
      this.setState({ token })
    }
  }
  render() {
    return (
      <Router>
        {/* <Route
          path="/"
          exact
          render={() =>
            this.state.token ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            )
          }
        /> */}
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Switch>
          <Route path="/home" component={Home} />
          {/* <Route path="/login" component={Login} /> */}
        </Switch>
      </Router>
    )
  }
}
// get()
export default hot(module)(App)
