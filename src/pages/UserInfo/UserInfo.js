import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Icon, Form, Input, Select, Button, Pagination } from 'antd'

const { Option } = Select
class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { id: null, server: 'ctserver5111' }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <span>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('id', {
                rules: [{ required: true, message: '请输入玩家账号！' }],
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="玩家账号"
                  style={{ width: 200 }}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('server', { initialValue: 'ctserver5111' })(
                <Select>
                  <Option value="ctserver5111">一服</Option>
                  <Option value="ctserver5112">二服</Option>
                  <Option value="ctserver5113">三服</Option>
                  <Option value="ctserver5114">四服</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </span>
      </div>
    )
  }
}
export default withRouter(Form.create({ name: 'search_userinfo' })(UserInfo))
