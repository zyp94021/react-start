import React, { Component } from 'react'
import {
  Card,
  Col,
  Row,
  Form,
  DatePicker,
  Input,
  Button,
  Table,
  Select,
} from 'antd'
import moment from 'moment'
import { getGeneralData, getServerData } from '@api/generalData'
const { Item } = Form
const { Option } = Select
const { RangePicker } = DatePicker
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
class GeneralData extends Component {
  state = {
    todayData,
    serverData: [{ id: 0, name: '所有服务器' }],
  }
  async componentWillMount() {
    const { result: data } = await getGeneralData({
      timestamp: Date.now(),
    })
    const todayData = this.state.todayData
    Object.entries(data).map(data => (todayData[data[0]].data = data[1]))
    let { result: serverData } = await getServerData()
    serverData = [this.state.serverData[0], ...serverData]
    this.setState({ todayData, serverData })
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.props.form.getFieldsValue())
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    }
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
              initialValue: this.state.serverData[0].id,
            })(
              <Select style={{ width: 160 }}>
                {this.state.serverData.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Item>
          <Item label="时间">
            {getFieldDecorator('time', {
              initialValue: [
                moment(Date.now() - 7 * 24 * 60 * 60 * 1000),
                moment(Date.now()),
              ],
            })(<RangePicker />)}
          </Item>
          <Item wrapperCol={{ span: 21, offset: 3 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Item>
        </Form>
      </div>
    )
  }
}
export default Form.create()(GeneralData)
