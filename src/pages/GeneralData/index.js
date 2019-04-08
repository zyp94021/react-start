import React, { Component } from 'react'
import { Card, Col, Row } from 'antd'
export default class GeneralData extends Component {
  render() {
    return (
      <Row gutter={16}>
        <Col span={3}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={3}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={3}>
          <Card title="Card title">Card content</Card>
        </Col>
      </Row>
    )
  }
}
