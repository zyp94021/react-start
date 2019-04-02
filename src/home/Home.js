import React, { Component } from 'react'
import Chat from '../chat/Chat'
export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="left">left</div>
        <div className="right">
          <Chat className="123" />
        </div>
      </div>
    )
  }
}
