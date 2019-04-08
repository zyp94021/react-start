import React, { Component } from 'react'
import { Form, Input, Select, Button, Pagination, } from 'antd';
import { withRouter } from "react-router"
import { Table, Divider, Tag } from 'antd';
import { random } from 'node-forge';
const { Option } = Select;
class UserCTHoldings extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'all', showData: [] };
    }
    handleServerChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        this.triggerChange({ value });
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    handleSubmit = (v) => {
        v.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        var showData = []
        for (let i = 0; i < Math.floor(Math.random()*1000); i++) {
            showData.push({
                server: this.state.value,
                address: this.state.value + '_' + i,
                count: (Math.random() * 10000).toFixed(0)
            }
            )
        }
        this.setState({ showData: showData })
        console.log(this.state)
    }
    render() {
        const state = this.state
        const columns = [{
            title: '区服',
            dataIndex: 'server',
            key: 'server',
        }, {
            title: '钱包',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'CT持有量',
            dataIndex: 'count',
            key: 'count',
        }];
        return (
            <div>
                <span className='chooseServer-container'>
                    <Form layout='inline' onSubmit={this.handleSubmit}>
                        <Form.Item label="请选择服务器">
                            <Select value={state.value} onChange={this.handleServerChange}>
                            <Option value="all">一/二/三/四服</Option>
                                <Option value="ctserver5111">一服</Option>
                                <Option value="ctserver5112">二服</Option>
                                <Option value="ctserver5113">三服</Option>
                                <Option value="ctserver5114">四服</Option>
                            </Select>
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
                        pagination={ { defaultPageSize:10 }}
                        bordered={true}
                        dataSource={state.showData}
                        columns={columns}
                        rowKey='address' />
                </span>
            </div>
        )
    }
}
export default withRouter(Form.create({ name: "normal_search_CTholdings" })(UserCTHoldings))