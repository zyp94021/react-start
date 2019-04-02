import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Chat from './chat/Chat'
import Todo from './todo/Todo'
import Login from './login/Login'
import Dialog from './dialog/Dialog'
import Home from './home/Home'
import AppData from './AppData'
import eventBus from './EventBus'
import Header from './header/Header'
import App from './App'
export class IndexRouter extends Component {
  constructor(props) {
    super(props)
    this.state = { token: '' }
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
      this.setState({ token })
      AppData.token = token
    }
  }

  render() {
    return (
      <Router>
        <Header />
        <Route path="/" exact component={this.state.token ? Home : Login} />
        <Route path="/chat/" component={Chat} />
        <Route path="/todo/" component={Todo} />
        <Route path="/login/" component={Login} />
        <Route path="/dialog/" component={Dialog} />
      </Router>
    )
  }
}
