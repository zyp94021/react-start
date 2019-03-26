import React, { Component } from 'react'
import Input from './Input'
import Container from './Container'
import './nes.css'
import './Chat.scss'
import io from 'socket.io-client'
export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.ws = io('ws://localhost:3001')
    this.ws.on('message', data => {
      console.log(data)
      this.addMessage(data)
    })

    this.state = { messages: [] }
  }
  sendMessage(message) {
    this.ws.emit('message', message)
  }
  addMessage(message) {
    const messages = this.state.messages
    messages.push(message)
    this.setState({ messages })
  }
  render() {
    return (
      <div>
        <Container messages={this.state.messages} />
        <Input sendMessage={this.sendMessage.bind(this)} />
      </div>
    )
  }
}
