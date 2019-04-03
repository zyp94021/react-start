import React, { Component } from 'react'
import eventBus from '../EventBus'
import AppData from '../AppData'
import { withRouter } from 'react-router'
import './header.scss'
class Header extends Component {
  constructor(props) {
    super(props)
  }
  logout() {
    eventBus.emitEvent('logout')
    this.props.history.push('/login')
  }
  render() {
    const loginBtn = <span className="title">登录</span>
    const logoutBtn = (
      <button className="logout-btn" onClick={this.logout.bind(this)}>
        登出
      </button>
    )
    return <div className="header content">{AppData.token ? logoutBtn : loginBtn}</div>
  }
}
export default withRouter(Header)
