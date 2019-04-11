import React, { Component } from 'react'
import { Card, Col, Row, Form, DatePicker, Button, Table, Select } from 'antd'
import ServerSelect from '@component/ServerSelect'
import moment from 'moment'
import { getGeneralData } from '@api'
import { server } from '@src/config'
const todayData = {
  reg_count: {
    title: '今日新增激活',
    data: 0,
  },
  dau: {
    title: '今日DAU',
    data: 0,
  },
  payCount: {
    title: '今日付费人数',
    data: 0,
  },
  data4: {
    title: '付费金额',
    data: 0,
  },
  data5: {
    title: '交易总流水',
    data: 0,
  },
  data6: {
    title: '交易订单量',
    data: 0,
  },
  data7: {
    title: 'CT用户存量',
    data: 0,
  },
  data8: {
    title: 'CT发行量',
    data: 0,
  },
  data9: {
    title: 'CT销毁量',
    data: 0,
  },
}
const endTime = new Date().setHours(0, 0, 0, 0)
const startTime = endTime - 24 * 60 * 60 * 1000 * 7

class GeneralData extends Component {
  state = {
    todayData,
    tableData: [],
    loading: false,
    pagination: {
      defaultCurrent: 1,
      defaultPageSize: 10,
      total: 0,
    },
  }
  onPageChange = async (current, pageSize) => {
    await this.getTableData({ current, pageSize })
  }

  async componentDidMount() {
    await this.getTodayData()
  }
  getTableData = async query => {
    this.setState({ loading: true })
    const formQuery = {
      start: this.props.form.getFieldValue('time')[0].valueOf(),
      end: this.props.form.getFieldValue('time')[1].valueOf(),
      current: this.state.pagination.defaultCurrent,
      pageSize: this.state.pagination.defaultPageSize,
    }
    const [tableData] = await getGeneralData({
      ...formQuery,
      ...query,
    })
    this.setState({ tableData, loading: false })
  }
  getTodayData = async () => {
    const now = moment(new Date())
      .subtract(1, 'days')
      .toDate()
    const [[data]] = await getGeneralData({
      end: now.getTime(),
      start: now.setHours(0, 0, 0, 0),
    })
    const todayData = this.state.todayData
    Object.entries(data).map(data =>
      todayData[data[0]] ? (todayData[data[0]].data = data[1]) : null,
    )
  }

  handleSubmit = async e => {
    e.preventDefault()
    await this.getTableData()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    }
    const { Item } = Form
    const { RangePicker } = DatePicker

    const tableColumnsData = [
      {
        title: '日期',
        dataIndex: 'time',
        width: 110,
        render: text => {
          return moment(text).format('YYYY-MM-D')
        },
      },
      {
        title: '新增注册',
        dataIndex: 'regist_count',
      },
      {
        title: '新增激活',
        dataIndex: 'reg_count',
      },
      {
        title: '日活跃用户',
        dataIndex: 'dau',
      },
      {
        title: '付费人数',
        dataIndex: 'payCount',
      },
      {
        title: 'eos流水',
        dataIndex: 'data6',
      },
      {
        title: '付费率',
        dataIndex: 'data7',
      },
      {
        title: 'APRU',
        dataIndex: 'data8',
      },
      {
        title: 'ARPPU',
        dataIndex: 'data9',
      },
      {
        title: '次留',
        dataIndex: 'data10',
      },
      {
        title: '7留',
        dataIndex: 'data11',
      },
      {
        title: '30留',
        dataIndex: 'data12',
      },
      {
        title: '特权购买',
        dataIndex: 'data13',
      },
      {
        title: '商城购买',
        dataIndex: 'data14',
      },
      {
        title: '礼包购买',
        dataIndex: 'data15',
      },
      {
        title: '交易所',
        dataIndex: 'sell',
        render: text => {
          return text || 0
        },
      },
      {
        title: '其它',
        dataIndex: 'data17',
        render: (text, record) => {
          if (record.costfunc) {
            const costfunc = record.costfunc
            const buyCommodity = costfunc.buyCommodity || 0
            const buyHammer = costfunc.buyHammer || 0
            const changecastle = costfunc.changecastle || 0
            const finishAct = costfunc.finishAct || 0
            return buyCommodity + buyHammer + changecastle + finishAct
          } else {
            return 0
          }
        },
      },
    ].map(item => {
      item.key = item.dataIndex
      return item
    })
    return (
      <div>
        <Row gutter={16}>
          {Object.entries(this.state.todayData).map(data => (
            <Col span={4} key={data[0]} style={{ marginBottom: 16 }}>
              <Card
                title={data[1].title}
                headStyle={{ textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center' }}
              >
                {data[1].data}
              </Card>
            </Col>
          ))}
        </Row>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item label="选择服务器">
            {getFieldDecorator('server', {
              initialValue: [server[0].id],
            })(<ServerSelect style={{ width: 350 }} />)}
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
        <Table
          columns={tableColumnsData}
          dataSource={this.state.tableData.map((item, index) => {
            item.key = index + 1
            return item
          })}
          loading={this.state.loading}
          bordered={true}
          pagination={{ ...this.state.pagination, onChange: this.onPageChange }}
        />
      </div>
    )
  }
}
export default Form.create()(GeneralData)
