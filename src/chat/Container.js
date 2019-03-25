import React, { Component } from 'react'
import Message from './Message'
export default class Container extends Component {
  render() {
    return (
      <div className="nes-container chat-container">
        {this.props.messages.map((message, index) => (
          <Message key={index} type="left" message={message} />
        ))}
      </div>
    )
  }
}
