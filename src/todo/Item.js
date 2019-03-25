import React, { Component } from 'react'
export default class Item extends Component {
  remove() {
    this.props.remove(this.props.index)
  }
  render() {
    return (
      <li>
        <span>{this.props.data}</span>
        <button onClick={this.remove.bind(this)}>删除</button>
      </li>
    )
  }
}
