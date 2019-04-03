import React, { Component } from 'react'
import eventBus from '../EventBus'
import { withRouter } from 'react-router'
import './login.scss'
import { Button, Form, Input, Checkbox, Icon } from 'antd'
import { login } from '../api/login'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      repassword: ''
    }
  }
  setUsername = e => {
    const username = e.target.value
    this.setState({ username })
  }
  setPassword = e => {
    const password = e.target.value
    this.setState({ password })
  }

  login = async () => {
    const username = this.state.username
    const password = this.state.password
    const data = { username, password }
    console.log(await login(data))

    // eventBus.emitEvent('login', '123')
    // this.props.history.push('/home')
  }
  handleSubmit = e => {
    e.preventDefault()
    this.login()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
                onBlur={this.setUsername}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default withRouter(Form.create({ name: 'normal_login' })(Login))
