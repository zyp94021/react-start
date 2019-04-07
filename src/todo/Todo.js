import React, { Component } from 'react'
import Input from './Input'
import List from './List'
export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  add(input) {
    const list = this.state.list
    list.push(input)
    this.setState({ list })
  }
  remove(index) {
    this.state.list.splice(index, 1)
    const list = this.state.list
    this.setState({ list })
  }
  render() {
    return (
      <div>
        <span>{this.props.span}</span>
        <Input add={this.add.bind(this)} />
        <List data={this.state.list} remove={this.remove.bind(this)} />
      </div>
    )
  }
}
