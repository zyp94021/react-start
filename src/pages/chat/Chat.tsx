import * as React from 'react'
import Input from './Input'
import Container from './Container'
import './Chat.less'
import * as io from 'socket.io-client'

interface ChatState {
  id: number
  messages: { message: string; id: number }[]
}
export default class Chat extends React.Component<{}, ChatState> {
  private ws: SocketIOClient.Socket
  constructor(props) {
    super(props)
    console.log(props)
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
    if (!this.ws) this.ws = io('ws://localhost:3001')
    this.ws.on('message', data => {
      console.log(data)
      this.addMessage(data)
    })
  }
  componentWillUnmount() {
    console.log('umount')
    this.ws.close()
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
