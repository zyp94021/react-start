import React, { Component } from 'react'
import eventBus from '../EventBus'
import AppData from '../AppData'
import { withRouter } from 'react-router'
class THeader extends Component {
  constructor(props) {
    super(props)
  }
  login() {
    this.props.history.push('/')
  }
  logout() {
    eventBus.emitEvent('logout')
    this.props.history.push('/')
  }
  render() {
    const loginBtn = <button onClick={this.login.bind(this)}>登录</button>
    const logoutBtn = <button onClick={this.logout.bind(this)}>登出</button>
    return <div>{AppData.token ? logoutBtn : loginBtn}</div>
  }
}
const Header = withRouter(THeader)
export default Header
