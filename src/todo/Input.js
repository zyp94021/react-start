import React, { Component } from 'react'
export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }
  add() {
    this.props.add(this.state.input)
    this.setState({ input: '' })
  }
  render() {
    return (
      <div>
        <input
          value={this.state.input}
          onChange={event => this.setState({ input: event.target.value })}
        />
        <button onClick={this.add.bind(this)}>添加</button>
      </div>
    )
  }
}
