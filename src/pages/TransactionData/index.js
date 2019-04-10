import React, { Component } from 'react'
import { Select, DatePicker, Form, Button, Row, Col, Table } from 'antd'
import ServerSelect from '@component/ServerSelect'
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

import { getAuctionData } from '@api'
import { server } from '@src/config'
const endTime = new Date().setHours(0, 0, 0, 0)
const startTime = endTime - 24 * 60 * 60 * 1000 * 7

class TransInfo extends Component {
  handleSubmit = async e => {
    e.preventDefault()
  }
  async componentDidMount() {
    await getAuctionData()
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
    const priceColumns = [
      {
        title: '种类',
        dataIndex: 'type',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
    ]
    priceColumns.map(item => {
      return { ...item }
    })
    const countColumns = []
    return (
      <div>
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
        <Row>
          <Col span={4}>
            <Table columns={priceColumns} />
          </Col>
          <Col span={20}>
            <Chart height={400} />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Table />
          </Col>
          <Col span={20}>
            <Chart height={400} />
          </Col>
        </Row>
      </div>
    )
  }
}
export default Form.create()(TransInfo)
