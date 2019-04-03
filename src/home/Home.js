import React, { Component } from 'react'
import Chat from '../chat/Chat'
import './home.scss'
export default class Home extends Component {
  render() {
    return (
      <div className="home content">
        <div className="left">left</div>
        <div className="right">
          <Chat />
        </div>
      </div>
    )
  }
}
