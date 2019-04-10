import React, { Component } from 'react'
import { Select, DatePicker, Form, Button } from 'antd'
import ServerSelect from '@component/ServerSelect'
import moment from 'moment'

const endTime = new Date().setHours(0, 0, 0, 0)
const startTime = endTime - 24 * 60 * 60 * 1000 * 7

class BatInfo extends Component {
  handleSubmit = async e => {
    e.preventDefault()
  }
  render() {
    const { Item } = Form
    const { Option } = Select
    const { RangePicker } = DatePicker
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    }
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item label="选择服务器">
            {getFieldDecorator('server')(
              <ServerSelect style={{ width: 350 }} />,
            )}
          </Item>
          <Item label="时间">
            {getFieldDecorator('time', {
              initialValue: [moment(startTime), moment(endTime)],
            })(<RangePicker allowClear={false} />)}
          </Item>

          <Item wrapperCol={{ span: 22, offset: 2 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Item>
        </Form>
      </div>
    )
  }
}
export default Form.create()(BatInfo)
