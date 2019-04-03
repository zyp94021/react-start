import React, { Component } from 'react'
import Message from './Message'
export default class Container extends Component {
  componentDidUpdate() {
    const list = this.refs['list']
    list.scrollTop = list.scrollHeight
  }
  render() {
    return (
      <div className="chat-container">
        <div className="message-list" ref="list">
          {this.props.messages.map((message, index) => (
            <Message
              key={index}
              type={this.props.id !== message.id ? 'left' : 'right'}
              message={message.message}
            />
          ))}
        </div>
      </div>
    )
  }
}
