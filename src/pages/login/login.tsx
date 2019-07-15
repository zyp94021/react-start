import * as React from 'react'
import eventBus from '../../EventBus'
import { withRouter, RouteComponentProps } from 'react-router'
import './login.less'
import { Button, Form, Input, Icon } from 'antd'
import { login, register } from '../../api/login'
import { FormComponentProps } from 'antd/lib/form'
import { loginRequest, loginSuccess, getTodo } from '../../store/action'
import { DispatchProp, connect } from 'react-redux'
interface LoginState {
  username: string
  password: string
  repassword: string
}
interface LoginProps
  extends RouteComponentProps,
    FormComponentProps,
    DispatchProp {}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      repassword: '',
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
    // store.dispatch(loginSuccess({ user: { name: username }, token: username }))
    // console.log(store.getState())
    console.log(123)
    const dispatch: any = this.props.dispatch
    dispatch(loginRequest({ username, password }))
    // const result: any = await login({ username, password })
    // if (result.code === 200) {
    //   eventBus.emitEvent('login', {
    //     name: this.state.username,
    //     token: result.token,
    //   })
    //   this.props.history.push('/home')
    // }
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
                { required: true, message: 'Please input your username!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
                onChange={this.setUsername}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
                onChange={this.setPassword}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button className="submit-button" type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default connect()(withRouter(Form.create()(Login) as any))
