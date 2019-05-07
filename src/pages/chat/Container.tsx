import * as React from 'react'
import Message from './Message'
interface ContainerProps {
  messages: { message: string; id: number }[]
  id: number
}
export default class Container extends React.Component<ContainerProps> {
  componentDidUpdate() {
    const list = this.refs['list'] as HTMLDivElement
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
