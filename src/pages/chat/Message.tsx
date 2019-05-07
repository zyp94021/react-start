import * as React from 'react'
interface MessageProps {
  type: string
  message: string
}
export default class Message extends React.Component<MessageProps> {
  render() {
    return (
      <div className={`chat-message ${this.props.type}`}>
        <p className="sender">name</p>
        <p className="message-content">{this.props.message}</p>
      </div>
    )
  }
}
