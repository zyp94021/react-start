import React, { Component } from 'react'
import { withRouter } from 'react-router'
import ServerSelect from '@component/ServerSelect'
import { server } from '@src/config'
import { sendMails } from '@api'

import {
  List,
  Icon,
  Form,
  Input,
  Select,
  Button,
  Pagination,
  Table,
  Row,
  Col,
  InputNumber,
  message,
} from 'antd'
const { Option } = Select
const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: { span: 16 },
}
let index = 0
const item_list = [
  { id: 1, name: 1 },
  { id: 2, name: 2 },
  { id: 3, name: 3 },
  { id: 4, name: 4 },
  { id: 5, name: 5 },
  { id: 6, name: 6 },
  { id: 7, name: 7 },
  { id: 8, name: 8 },
  { id: 9, name: 9 },
  { id: 10, name: 10 },
  { id: 11, name: 11 },
  { id: 12, name: 12 },
  { id: 13, name: 13 },
  { id: 14, name: 14 },
  { id: 15, name: 15 },
  { id: 1001001, name: 1001001 },
  { id: 1001002, name: 1001002 },
  { id: 1002001, name: 1002001 },
  { id: 1002005, name: 1002005 },
  { id: 1003001, name: 1003001 },
  { id: 1003002, name: 1003002 },
  { id: 1004001, name: 1004001 },
]
class SendMail extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    index = 0
  }
  handleAddAttachment = e => {
    const { form } = this.props
    const keys = form.getFieldValue('attachment_key')
    const keys2 = form.getFieldValue('attachmentcount_key')
    if (!keys || !keys2) return
    const v = form
      .getFieldValue('attachment')
      .concat({ index: index++, id: keys, count: keys2 })
    form.setFieldsValue({
      attachment: v,
    })
  }
  removeAttachment = k => {
    const { form } = this.props
    const keys = form.getFieldValue('attachment')
    form.setFieldsValue({
      attachment: keys.filter(key => key.index !== k.index),
    })
  }

  handleSubmit = v => {
    v.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        var adds = values.sendusers.split(',')
        var mails = []
        var send_items = {}
        if (values.attachment) {
          values.attachment.forEach(element => {
            send_items[element.id] = element.count
          })
        }
        adds.forEach(element => {
          mails.push({
            uid: element,
            sid: 'system',
            items: send_items,
            title: values.mailtitle,
            content: values.mailcontent,
            time: Date.now(),
            read_status: 0,
            receive_status: 0,
            deleted: false,
          })
        })
        console.log(mails)
        const [data] = await sendMails({ mail_info_arr: mails })
        message.info(data.result)
        // this.props.form.resetFields()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    getFieldDecorator('attachment', { initialValue: [] })
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Row>
            <Col span={8}>
              <Form.Item
                label="类型选择"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                {getFieldDecorator('sendtype', { initialValue: 'address' })(
                  <Select style={{ width: 160 }}>
                    <Option value="address">钱包地址</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="区服"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                {getFieldDecorator('server', {
                  initialValue: [server[0].id],
                })(<ServerSelect style={{ width: 160 }} />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="发放玩家">
            {getFieldDecorator('sendusers', {
              rules: [{ required: true, message: '请输入玩家账号！' }],
            })(
              <TextArea
                placeholder="多个玩家用英文逗号分隔"
                autosize={{ minRows: 2, maxRows: 6 }}
              />,
            )}
          </Form.Item>
          <Form.Item label="邮件标题">
            {getFieldDecorator('mailtitle', {
              rules: [{ required: true, message: '请输入邮件标题！' }],
            })(
              <TextArea
                placeholder="邮件标题"
                autosize={{ minRows: 1, maxRows: 2 }}
              />,
            )}
          </Form.Item>
          <Form.Item label="邮件内容">
            {getFieldDecorator('mailcontent', {
              rules: [{ required: true, message: '请输入邮件内容！' }],
            })(
              <TextArea
                placeholder="邮件内容"
                autosize={{ minRows: 2, maxRows: 6 }}
              />,
            )}
          </Form.Item>
          <Row>
            <Col span={4}>
              <Form.Item
                label="附件资源"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator('attachment_key')(
                  <Select style={{ width: 160 }}>
                    {/* <Option value="item1">item1</Option>
                    <Option value="item2">item2</Option>
                    <Option value="item3">item3</Option>
                    <Option value="item4">item4</Option>
                    <Option value="item5">item5</Option>
                    <Option value="item6">item6</Option> */}
                    {item_list.map(item => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      )
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {getFieldDecorator('attachmentcount_key')(
                  <InputNumber
                    addonBefore="数量"
                    style={{ width: 200, marginLeft: 20 }}
                    min={1}
                  />,
                )}
                <Button
                  type="primary"
                  style={{ width: '100', marginLeft: 20 }}
                  onClick={this.handleAddAttachment}
                >
                  <Icon type="plus" />
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="附件列表">
            <List
              bordered={true}
              size={'middle'}
              dataSource={this.props.form.getFieldValue('attachment')}
              renderItem={item => (
                <List.Item>
                  {item.id}
                  <Icon
                    style={{ marginLeft: 10 }}
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    theme="twoTone"
                    onClick={() => this.removeAttachment(item)}
                    twoToneColor={'#CC0000'}
                  />
                </List.Item>
              )}
            />
            <div>注:如已选资源，附件列表中是将要给玩家发送的资源列表</div>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              发送
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default withRouter(Form.create({ name: 'send_mail' })(SendMail))
