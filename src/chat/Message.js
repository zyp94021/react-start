import React, { Component } from 'react'
export default class Message extends Component {
  render() {
    return (
      <div className={`chat-message ${this.props.type}`}>
        <p className="sender">name</p>
        <p className="message-content">{this.props.message}</p>
      </div>
    )
  }
}
