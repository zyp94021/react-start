import React, { Component } from 'react'
export default class FormItem extends Component {
  usernameBlur() {}
  render() {
    return (
      <div className="form-box">
        <label>{this.props.label}</label>
        <input onBlur={this.usernameBlur.bind(this)} />
        <span>{this.props.tip}</span>
      </div>
    )
  }
}
