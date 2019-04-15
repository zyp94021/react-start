import React, { Component } from 'react'
import { Form, Input, Select, Button, Pagination } from 'antd'
import { withRouter } from 'react-router'
import { Table, Divider, Tag } from 'antd'
import { random } from 'node-forge'
import ServerSelect from '@component/ServerSelect'
import { server } from '@src/config'
import { getUserAddress } from '@api'
import AppData from '@src/AppData'
const { Option } = Select
const eosplayer = window.eosplayer
class UserCTHoldings extends Component {
  constructor(props) {
    super(props)
    this.state = { value: 'all', showData: [], loading: false }
  }

  handleServerChange = value => {
    if (!('value' in this.props)) {
      this.setState({ value })
    }
    this.triggerChange({ value })
  }
  triggerChange = changedValue => {
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }
  handleSubmit = v => {
    v.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.setState({ loading: true })

        var [data] = await getUserAddress()
        if (data) {
          data = data.map((item, index) => {
            return {
              server: server.find(item => item.id === AppData.server[0]).name,
              address: item,
              count: '0',
            }
          })
        }
        var infos = await Promise.all(
          data.map(element => {
            return eosplayer.chain.getBalance(
              element.address,
              'tonartstoken',
              'CT',
            )
          }),
        )
        data.map((item, index) => {
          item.count = infos[index] ? infos[index] : '0.0000 CT'
        })
        data = data.sort((a, b) => {
          if (Number(a.count.split(' ')[0]) > Number(b.count.split(' ')[0]))
            return -1
          else if (
            Number(a.count.split(' ')[0]) < Number(b.count.split(' ')[0])
          )
            return 1
          else return 0
        })
        console.log(data)
        this.setState({ loading: false })
        this.setState({ showData: data })
      }
    })
  }
  render() {
    const state = this.state
    const columns = [
      {
        title: '区服',
        dataIndex: 'server',
        key: 'server',
      },
      {
        title: '钱包',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'CT持有量',
        dataIndex: 'count',
        key: 'count',
      },
    ]
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <span className="chooseServer-container">
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item label="请选择服务器">
              {getFieldDecorator('server', {
                initialValue: [server[0].id],
              })(<ServerSelect style={{ width: 160 }} />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </span>
        <span>
          <Table
            pagination={{ defaultPageSize: 10 }}
            bordered={true}
            columns={columns}
            dataSource={state.showData}
            rowKey="address"
            style={{ width: 600 }}
            loading={this.state.loading}
          />
        </span>
      </div>
    )
  }
}
export default withRouter(
  Form.create({ name: 'normal_search_CTholdings' })(UserCTHoldings),
)
