import React, { Component } from 'react'
export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = { input: '' }
  }
  sendMessage() {
    this.props.sendMessage(this.state.input)
    this.setState({ input: '' })
  }
  render() {
    return (
      <div className="chat-input-box">
        <input
          className="nes-input chat-input"
          value={this.state.input}
          onChange={event => this.setState({ input: event.target.value })}
        />
        <button
          className="nes-btn chat-send-btn"
          onClick={this.sendMessage.bind(this)}
        >
          按钮
        </button>
      </div>
    )
  }
}
