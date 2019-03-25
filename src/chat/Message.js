import React, { Component } from 'react'
export default class Message extends Component {
  render() {
    const message = (
      <div className={`nes-balloon from-${this.props.type}`}>
        <p>{this.props.message}</p>
      </div>
    )
    return (
      <div className={`chat-message -${this.props.type}`}>
        {this.props.type === 'right' && message}
        <i className="nes-bcrikko" />
        {this.props.type === 'left' && message}
      </div>
    )
  }
}
