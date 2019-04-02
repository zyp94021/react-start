import React, { Component } from 'react'
import eventBus from '../EventBus'
import { withRouter } from 'react-router'
class Login extends Component {
  login() {
    eventBus.emitEvent('login', '123')
    this.props.history.push('/home')
  }
  render() {
    return (
      <div>
        <button onClick={this.login.bind(this)}>登录</button>
      </div>
    )
  }
}
export default withRouter(Login)
