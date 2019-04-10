import React, { Component } from 'react'
import { Card, Col, Row, Form, DatePicker, Button, Table, Select } from 'antd'
import ServerSelect from '@component/ServerSelect'
import moment from 'moment'
import { getGeneralData } from '@api/generalData'
import { server } from '@src/config'
const todayData = {
  data1: {
    title: '今日新增激活',
    data: 0,
  },
  data2: {
    title: '今日DAU',
    data: 0,
  },
  data3: {
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
      defaultPageSize: 15,
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
    const [{ result: tableData }] = await getGeneralData({
      ...formQuery,
      ...query,
    })
    this.setState({ tableData, loading: false })
  }
  getTodayData = async () => {
    const now = new Date()
    
    const [{ result: data }] = await getGeneralData({
      start: now.setHours(0, 0, 0, 0),
      end: now.getTime(),
    })
    const todayData = this.state.todayData
    Object.entries(data).map(data => (todayData[data[0]].data = data[1]))
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
        dataIndex: 'data1',
        width: 110,
      },
      {
        title: '新增注册',
        dataIndex: 'data2',
      },
      {
        title: '新增激活',
        dataIndex: 'data3',
      },
      {
        title: '日活跃用户',
        dataIndex: 'data4',
      },
      {
        title: '付费人数',
        dataIndex: 'data5',
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
        dataIndex: 'data16',
      },
      {
        title: '其它',
        dataIndex: 'data17',
      },
    ]
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
          columns={tableColumnsData.map(item => {
            item.key = item.dataIndex
            return item
          })}
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
