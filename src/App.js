import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Chat from './chat/Chat'
import Todo from './todo/Todo'
import Login from './login/Login'
import Dialog from './dialog/Dialog'
import Home from './home/Home'
import AppData from './AppData'
import eventBus from './EventBus'
import Header from './header/Header'
import { hot } from 'react-hot-loader'
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { token: localStorage.getItem('token') }
  }
  componentDidMount() {
    eventBus.addEventListener('login', token => {
      AppData.token = token
      localStorage.setItem('token', AppData.token)
      this.setState({
        token: AppData.token
      })
    })
    eventBus.addEventListener('logout', () => {
      AppData.token = ''
      localStorage.removeItem('token')
      this.setState({
        token: AppData.token
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
        <Route
          path="/"
          exact
          render={() =>
            this.state.token ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Switch>
          <Route path="/home/" component={Home} />
          <Route path="/login/" component={Login} />
        </Switch>
      </Router>
    )
  }
}
// get()
export default hot(module)(App)
