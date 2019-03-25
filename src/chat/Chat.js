import React, { Component } from 'react'
import Input from './Input'
import Container from './Container'
import './nes.css'
import './Chat.scss'
export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.ws = new WebSocket('ws://localhost:8001')

    this.ws.onopen = e => {
      console.log('Connection to server opened')
    }
    this.ws.onmessage = event => {
      console.log('Client received a message', event.data)
      this.addMessage(event.data)
    }
    this.ws.onclose = e => {
      console.log('connection closed.')
    }

    this.state = { messages: [] }
  }
  sendMessage(message) {
    this.ws.send(message)
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
