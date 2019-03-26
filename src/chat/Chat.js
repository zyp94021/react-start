import React, { Component } from 'react'
import Input from './Input'
import Container from './Container'
import './Chat.scss'
import './nes.css'
import io from 'socket.io-client'
export default class Chat extends Component {
  constructor(props) {
    super(props)
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
  componentDidMount() {
    this.ws = io('ws://192.168.123.162:3001')
    this.ws.on('message', data => {
      console.log(data)
      this.addMessage(data)
    })
  }
  componentWillUnmount() {
    this.ws = null
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
