import React, { Component } from 'react'
import { Card, Col, Row } from 'antd'
import { getGeneralData } from '@api/generalData'
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
export default class GeneralData extends Component {
  state = {
    todayData,
  }
  async componentWillMount() {
    const data = await getGeneralData({ timestamp: Date.now(), day: 1 })
    const todayData = this.state.todayData
    Object.entries(data).map(data => (todayData[data[0]].data = data[1]))
    this.setState({ todayData })
  }

  render() {
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
      </div>
    )
  }
}
