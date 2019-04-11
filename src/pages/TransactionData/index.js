import React, { Component } from 'react'
import {
  Select,
  DatePicker,
  Form,
  Button,
  Row,
  Col,
  Table,
  Typography,
} from 'antd'
import ServerSelect from '@component/ServerSelect'
import moment from 'moment'
import { timeFormatter } from '@utils'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from 'bizcharts'
import DataSet from '@antv/data-set'

import { getAuctionData } from '@api'
import { server } from '@src/config'
const endTime = new Date().setHours(0, 0, 0, 0)
const startTime = endTime - 24 * 60 * 60 * 1000 * 7
const type = [
  {
    type: 'forage',
    name: '粮草',
  },
  {
    type: 'oil',
    name: '石油',
  },
  {
    type: 'wood',
    name: '木材',
  },
  {
    type: 'ore1',
    name: '1级矿石',
  },
  {
    type: 'ore2',
    name: '2级矿石',
  },
  {
    type: 'ore3',
    name: '3级矿石',
  },
  {
    type: 'ore4',
    name: '4级矿石',
  },
  {
    type: 'ore5',
    name: '5级矿石',
  },
]
const columns = [
  {
    title: '粮草',
    dataIndex: 'forage',
  },
  {
    title: '石油',
    dataIndex: 'oil',
  },
  {
    title: '木材',
    dataIndex: 'wood',
  },
  {
    title: '1级矿石',
    dataIndex: 'ore1',
  },
  {
    title: '2级矿石',
    dataIndex: 'ore2',
  },
  {
    title: '3级矿石',
    dataIndex: 'ore3',
  },
  {
    title: '4级矿石',
    dataIndex: 'ore4',
  },
  {
    title: '5级矿石',
    dataIndex: 'ore5',
  },
]
const priceColumns = columns.map(item => {
  const data = { ...item }
  data.key = item.dataIndex
  data.title += '价格/K'
  return { ...data, type: 'center' }
})
const countColumns = columns.map(item => {
  const data = { ...item }
  data.key = item.dataIndex
  data.title += '交易次数'
  return { ...data, type: 'center' }
})
class TransInfo extends Component {
  state = {
    countColumns: [
      {
        title: '时间',
        dataIndex: 'time',
        type: 'center',
        key: 'time',
      },
      {
        title: '资源',
        dataIndex: 'type',
        type: 'center',
        key: 'type',
      },
    ],
    priceColumns: [
      {
        title: '时间',
        dataIndex: 'time',
        type: 'center',
        key: 'time',
      },
      {
        title: '资源',
        dataIndex: 'type',
        type: 'center',
        key: 'type',
      },
    ],
    countData: [],
    priceData: [],
    loading: false,
    countChartData: [],
    priceChartData: [],
  }
  handleSubmit = async e => {
    e.preventDefault()
    await this.getData()
  }

  async componentDidMount() {}

  getData = async () => {
    this.setState({ loading: true })
    const type = this.props.form.getFieldValue('type')
    const query = {
      start: this.props.form.getFieldValue('time')[0].valueOf(),
      end: this.props.form.getFieldValue('time')[1].valueOf(),
      type: this.props.form.getFieldValue('type'),
    }
    const [data] = await getAuctionData(query)
    data.forEach(item => (item.time = timeFormatter(item.time)))
    const countData = data.map((item, index) => {
      const data = { ...item }
      Object.keys(item).forEach(key => {
        if (key !== 'time') {
          data[key] = item[key].count
        }
      })
      data.key = index + 1
      return data
    })
    const priceData = data.map((item, index) => {
      const data = { ...item }
      Object.keys(item).forEach(key => {
        if (key !== 'time') {
          data[key] = Math.round(item[key].price * 1000 * 10000) / 10000
        }
      })
      data.key = index + 1
      return data
    })
    const newCountColumns = countColumns.filter(
      item => type.indexOf(item.dataIndex) > -1,
    )
    const newPriceColumns = priceColumns.filter(
      item => type.indexOf(item.dataIndex) > -1,
    )
    const countChartData = this.transChartData(countData, type)
    const priceChartData = this.transChartData(priceData, type)
    this.setState({
      countColumns: [this.state.countColumns[0], ...newCountColumns],
      countData,
      priceColumns: [this.state.priceColumns[0], ...newPriceColumns],
      priceData,
      loading: false,
      countChartData,
      priceChartData,
    })
  }
  transChartData = (data, type) => {
    const ds = new DataSet()
    const dv = ds.createView().source(data)
    dv.transform({
      type: 'fold',
      fields: type,
      // 展开字段集
      key: 'type',
      // key字段
      value: 'value', // value字段
    })
    return dv
  }

  render() {
    const { Item } = Form
    const { Option } = Select
    const { RangePicker } = DatePicker
    const { Title } = Typography
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    }
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item label="选择服务器">
            {getFieldDecorator('server', {
              initialValue: [server[0].id],
            })(<ServerSelect style={{ width: 350 }} />)}
          </Item>
          <Item label="选择类型">
            {getFieldDecorator('type', {
              initialValue: [type[0].type],
            })(
              <Select style={{ width: 350 }} mode="multiple">
                {type.map(item => (
                  <Option key={item.type} value={item.type}>
                    {item.name}
                  </Option>
                ))}
              </Select>,
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
        <Row>
          <Col span={11}>
            <Table
              columns={this.state.priceColumns}
              dataSource={this.state.priceData}
              loading={this.state.loading}
            />
          </Col>
          <Col span={11} offset={2}>
            <Table
              columns={this.state.countColumns}
              dataSource={this.state.countData}
              loading={this.state.loading}
            />
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <Title level={4}>价格</Title>
            <Chart
              height={400}
              padding="auto"
              data={this.state.priceChartData}
              forceFit
            >
              <Legend
                itemFormatter={val => type.find(item => item.type == val).name}
              />
              <Axis name="time" />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: 'y',
                }}
              />
              <Geom type="line" position="time*value" size={2} color={'type'} />
              
            </Chart>
          </Col>
          <Col span={11} offset={2}>
            <Title level={4}>次数</Title>
            <Chart
              height={400}
              padding="auto"
              data={this.state.countChartData}
              forceFit
            >
              <Legend
                itemFormatter={val => type.find(item => item.type == val).name}
              />
              <Axis name="time" />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: 'y',
                }}
              />
              <Geom type="line" position="time*value" size={2} color={'type'}/>
              
            </Chart>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Form.create()(TransInfo)
