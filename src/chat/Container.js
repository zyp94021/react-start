import React, { Component } from 'react'
import Message from './Message'
export default class Container extends Component {
  render() {
    console.log(this.props.id)
    return (
      <div className="chat-container">
        {this.props.messages.map((message, index) => (
          <Message
            key={index}
            type={this.props.id !== message.id ? 'left' : 'right'}
            message={message.message}
          />
        ))}
      </div>
    )
  }
}
