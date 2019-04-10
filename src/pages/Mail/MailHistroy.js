import React, { Component } from 'react'
import { withRouter } from 'react-router'
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
  DatePicker,
  Modal,
} from 'antd'
import moment from 'moment'
import { mailsHistroy } from '@api'
const { RangePicker } = DatePicker

class MailHistroy extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    info: [],
    titleModal: false,
    title: '',
    contentModal: false,
    content: '',
    attachmentModal: false,
    attachment: {},
  }

  handleSubmit = v => {
    v.preventDefault()
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        console.log()
        console.log()
        var start = this.props.form.getFieldValue('sendtime')[0].valueOf()
        var end = this.props.form.getFieldValue('sendtime')[1].valueOf()
        var params = {
          start: start,
          end: end,
        }
         params['sid'] = values.sender
        var [req]=await mailsHistroy(params)
        console.log(req)
        var table = []
        let i=0
        req.forEach(element => {
          table.push({
            index:i++,
            time: moment(element.time).format('YYYY/MM/DD HH:mm:ss'),
            sender: element.sid,
            addressee: element.uid,
            status: '发送完成',
            title: element.title,
            content: element.content,
            attachment: JSON.stringify(element.items),
          })
        });
        this.setState({ info: table })
      }
    })
  }
  handleAttachmentClick = e => {
    console.log(e)
    this.setState({ attachmentModal: true, attachment: e.attachment })
  }

  handleContentClick = e => {
    console.log(e)
    this.setState({ contentModal: true, content: e.content })
  }

  handleTitleClick = e => {
    console.log(e)
    this.setState({ titleModal: true, title: e.title })
  }

  render() {
    const data = [
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '发件人',
        dataIndex: 'sender',
        key: 'sender',
      },
      {
        title: '收件人',
        dataIndex: 'addressee',
        key: 'addressee',
      },
      {
        title: '发送状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '邮件标题',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return (
            <Button
              onClick={() => {
                this.handleTitleClick(record)
              }}
            >
              {' '}
              点击查看
            </Button>
          )
        },
      },
      {
        title: '邮件内容',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          return (
            <Button
              onClick={() => {
                this.handleContentClick(record)
              }}
            >
              {' '}
              点击查看
            </Button>
          )
        },
      },
      {
        title: '附件内容',
        dataIndex: 'attachment',
        key: 'attachment',
        render: (text, record) => {
          return (
            <Button
              onClick={() => {
                this.handleAttachmentClick(record)
              }}
            >
              {' '}
              点击查看
            </Button>
          )
        },
      },
    ]
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="发件人">
            {getFieldDecorator('sender', {
              rules: [{ required: true, message: '请输入发件人！' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="发放时间">
            {getFieldDecorator('sendtime', {
              initialValue: [
                moment(Date.now() - 1 * 24 * 60 * 60 * 1000),
                moment(Date.now()),
              ],
            })(
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [
                    moment().startOf('month'),
                    moment().endOf('month'),
                  ],
                }}
                format="YYYY/MM/DD HH:mm:ss"
                placeholder={['Start Time', 'End Time']}
                showTime={{ format: 'HH:mm' }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              发送
            </Button>
          </Form.Item>
        </Form>
        <Table
          style={{ width: 1000 }}
          dataSource={this.state.info}
          bordered={true}
          columns={data}
          rowKey="index"
        />
        <div>
          <Modal
            title="邮件标题"
            visible={this.state.titleModal}
            onOk={() => {
              this.setState({ titleModal: false })
            }}
            onCancel={() => {
              this.setState({ titleModal: false })
            }}
          >
            {this.state.title}
          </Modal>
        </div>
        <div>
          <Modal
            title="邮件内容"
            visible={this.state.contentModal}
            onOk={() => {
              this.setState({ contentModal: false })
            }}
            onCancel={() => {
              this.setState({ contentModal: false })
            }}
          >
            {this.state.content}
          </Modal>
        </div>
        <div>
          <Modal
            title="附件内容"
            visible={this.state.attachmentModal}
            onOk={() => {
              this.setState({ attachmentModal: false })
            }}
            onCancel={() => {
              this.setState({ attachmentModal: false })
            }}
          >
            {this.state.attachment}
          </Modal>
        </div>
      </div>
    )
  }
}
export default withRouter(Form.create({ name: 'mail_histroy' })(MailHistroy))
