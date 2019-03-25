import React, { Component } from 'react'
import Item from './Item'
export default class List extends Component {
  render() {
    return (
      <ul>
        {this.props.data.map((data, index) => (
          <Item
            key={index}
            data={data}
            index={index}
            remove={this.props.remove}
          />
        ))}
      </ul>
    )
  }
}
