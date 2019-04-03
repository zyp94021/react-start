import React, { Component } from 'react'
import Input from './Input'
import Container from './Container'
import './Chat.scss'
import io from 'socket.io-client'
export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: [], id: Math.random() }
  }
  sendMessage(message) {
    const id = this.state.id
    this.ws.emit('message', { id, message })
  }
  addMessage(message) {
    const messages = this.state.messages
    messages.push(message)
    this.setState({ messages })
  }
  componentDidMount() {
    console.log('mount')
    if (!this.ws) this.ws = io('ws://10.1.100.97:3001')
    this.ws.on('message', data => {
      console.log(data)
      this.addMessage(data)
    })
  }
  componentWillUnmount() {
    console.log('umount')
    this.ws.off('message')
  }
  render() {
    return (
      <div className="chat-box">
        <Container messages={this.state.messages} id={this.state.id} />
        <Input sendMessage={this.sendMessage.bind(this)} />
      </div>
    )
  }
}
