import React, { Component } from 'react'
import { Form, Select, DatePicker, Button, Table } from 'antd'
import moment from 'moment'
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts'
import DataSet from '@antv/data-set'
import { getServerData, getResInfoData } from '@api'
import { server } from '@src/config'
import AppData from '@src/AppData'
import ServerSelect from '@component/ServerSelect'
const { Item } = Form

const { RangePicker } = DatePicker

const endTime = new Date().setHours(0, 0, 0, 0)
const startTime = endTime - 24 * 60 * 60 * 1000
class ResInfo extends Component {
  state = {
    chartData: null,
    outputData: [],
    outputLoading: false,
    outputPagination: {
      defaultCurrent: 1,
      defaultPageSize: 15,
      total: 0,
    },
    expendData: [],
    expendLoading: false,
    expendPagination: {
      defaultCurrent: 1,
      defaultPageSize: 15,
      total: 0,
    },
  }

  handleSubmit = async e => {
    e.preventDefault()
    AppData.server = this.props.form.getFieldValue('server')
    await this.getChartData()
  }
  getChartData = async () => {
    const query = {
      type: this.props.form.getFieldValue('type'),
      startTime: this.props.form.getFieldValue('time')[0].valueOf(),
      endTime: this.props.form.getFieldValue('time')[1].valueOf(),
    }
    const [{ result }] = await getResInfoData(query)
    this.renderChart(result)
  }
  getTableData = async () => {}
  renderChart = data => {
    const ds = new DataSet()
    const dv = ds.createView().source(data)
    dv.transform({
      type: 'fold',
      fields: ['output', 'expend'],
      // 展开字段集
      key: 'type',
      // key字段
      value: 'value', // value字段
    })
    this.setState({ chartData: dv })
  }
  onOutputPageChange = async (current, pageSize) => {
    // await this.getTableData({ current, pageSize })
  }
  onExpendPageChange = async (current, pageSize) => {
    // await this.getTableData({ current, pageSize })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    }
    const typeArr = [
      {
        type: 1,
        name: '粮草',
      },
      {
        type: 2,
        name: '木材',
      },
      {
        type: 3,
        name: '矿石',
      },
      {
        type: 4,
        name: '石油',
      },
      {
        type: 5,
        name: 'CT',
      },
      {
        type: 6,
        name: '兵力',
      },
    ]
    const outputColumns = [
      {
        title: '时间',
        dataIndex: 'data1',
        width: 110,
      },
      {
        title: '产出资源',
        dataIndex: 'data2',
      },
      {
        title: '产出数量',
        dataIndex: 'data3',
      },
      {
        title: '产出途径',
        dataIndex: 'data4',
      },
    ]
    const expendColumns = [
      {
        title: '时间',
        dataIndex: 'data1',
        width: 110,
      },
      {
        title: '消耗资源',
        dataIndex: 'data2',
      },
      {
        title: '消耗数量',
        dataIndex: 'data3',
      },
      {
        title: '消耗途径',
        dataIndex: 'data4',
      },
    ]
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item label="选择资源">
            {getFieldDecorator('type', {
              initialValue: typeArr[0].type,
            })(
              <Select style={{ width: 160 }}>
                {typeArr.map(item => (
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
          <Item label="选择服务器">
            {getFieldDecorator('server', {
              initialValue: [server[0].id],
            })(<ServerSelect style={{ width: 350 }} />)}
          </Item>
          <Item wrapperCol={{ span: 21, offset: 3 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Item>
        </Form>
        <Chart height={400} padding="auto" data={this.state.chartData} forceFit>
          <Legend />
          <Axis name="time" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="time*value" size={2} color={'type'} />
          <Geom
            type="point"
            position="time*value"
            size={4}
            shape={'circle'}
            color={'type'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
        <Table
          columns={outputColumns.map(item => {
            item.key = item.dataIndex
            return item
          })}
          dataSource={this.state.outputData.map((item, index) => {
            item.key = index + 1
            return item
          })}
          loading={this.state.loading}
          bordered={true}
          pagination={{
            ...this.state.outputPagination,
            onChange: this.onOutputPageChange,
          }}
        />
        <Table
          columns={expendColumns.map(item => {
            item.key = item.dataIndex
            return item
          })}
          dataSource={this.state.expendData.map((item, index) => {
            item.key = index + 1
            return item
          })}
          loading={this.state.loading}
          bordered={true}
          pagination={{
            ...this.state.expendPagination,
            onChange: this.onExpendPageChange,
          }}
        />
      </div>
    )
  }
}
export default Form.create()(ResInfo)
