import React, { Component } from 'react'
import eventBus from '../EventBus'
import AppData from '../AppData'
import { withRouter } from 'react-router'
class Header extends Component {
  constructor(props) {
    super(props)
  }
  login() {
    this.props.history.push('/login')
  }
  logout() {
    eventBus.emitEvent('logout')
    this.props.history.push('/login')
  }
  render() {
    const loginBtn = <button onClick={this.login.bind(this)}>登录</button>
    const logoutBtn = <button onClick={this.logout.bind(this)}>登出</button>
    return <div>{AppData.token ? logoutBtn : loginBtn}</div>
  }
}
export default withRouter(Header)
