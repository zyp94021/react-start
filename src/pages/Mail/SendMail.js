import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { getServerData } from '@api/generalData'
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
class SendMail extends Component {
  constructor(props) {
    super(props)
    this.state = { serverData: [] }
  }
  async componentDidMount() {
    let { result: serverData } = await getServerData()
    this.setState({ serverData })
    console.log(this.state)
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
    console.log(form.getFieldValue('attachment'))
  }
  removeAttachment = k => {
    const { form } = this.props
    const keys = form.getFieldValue('attachment')
    form.setFieldsValue({
      attachment: keys.filter(key => key.index !== k.index),
    })
    console.log(form.getFieldValue('attachment'))
  }

  handleSubmit = v => {
    v.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
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
                  initialValue:
                    this.state.serverData.length > 0
                      ? this.state.serverData[0].id
                      : null,
                })(
                  <Select style={{ width: 160 }}>
                    {this.state.serverData.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="发放玩家">
            {getFieldDecorator('sendusers', {
              rules: [{ required: true, message: '请输入玩家账号！' }],
            })(
              <TextArea
                placeholder="多个玩家用英文都好分隔"
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
                    <Option value="item1">item1</Option>
                    <Option value="item2">item2</Option>
                    <Option value="item3">item3</Option>
                    <Option value="item4">item4</Option>
                    <Option value="item5">item5</Option>
                    <Option value="item6">item6</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {getFieldDecorator('attachmentcount_key')(
                  <Input
                    addonBefore="数量"
                    style={{ width: 200, marginLeft: 20 }}
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
          </Form.Item>
          <Form.Item  wrapperCol={{ span: 12, offset: 6 }}>
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
