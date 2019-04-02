import React, { Component } from 'react'
import eventBus from '../EventBus'
export default class Login extends Component {
  login() {
    eventBus.emitEvent('login', '123')
  }
  render() {
    return (
      <div>
        <button onClick={this.login.bind(this)}>登录</button>
      </div>
    )
  }
}
