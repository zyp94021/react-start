import React, { Component } from 'react'
import AppData from '@src/AppData'
import { server } from '@src/config'
import { Select } from 'antd'
const { Option } = Select
export default class ServerSelect extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      }
    }
    return null
  }
  state = { server: this.props.value }
  handleChange = value => {
    AppData.server = value
    this.triggerChange({ server: value })
  }
  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }
  componentDidMount() {
    this.setState({ server: server[0].id })
    AppData.server = this.state.server
  }

  render() {
    return (
      <Select
        mode="multiple"
        onChange={this.handleChange}
        style={this.props.style}
        value={this.state.server}
      >
        {server.map(item => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    )
  }
}
