import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { server } from '@src/config'
import ServerSelect from '@component/ServerSelect'
import { getUserBaseInfo } from '@api'
import {
  Card,
  List,
  Icon,
  Form,
  Input,
  Select,
  Button,
  Pagination,
  Table,
  Row,
  Col,
  DatePicker,
} from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker
const { Option } = Select
const colWidth_1 = '100px'
const userBaseDataCol = [
  { title: '玩家账号', dataIndex: 'id', key: 'id' },
  { title: '城堡等级', dataIndex: 'castle', key: 'castle' },
  { title: 'Vip等级', dataIndex: 'vip', key: 'vip' },
  { title: '持有EOS', dataIndex: 'EOS', key: 'EOS' },
  { title: '资产价值EOS', dataIndex: 'itemEOS', key: 'itemEOS' },
  { title: '注册时间', dataIndex: 'registerTime', key: 'registerTime' },
  { title: '最后登陆时间', dataIndex: 'lastLoginTime', key: 'lastLoginTime' },
]
const userDetailInfoCol = [
  { title: '木场等级', dataIndex: 'millLV', key: 'millLV' },
  { title: '矿场等级', dataIndex: 'mineLV', key: 'mineLV' },
  { title: '科技等级', dataIndex: 'tecLV', key: 'tecLV' },
  { title: '所在联盟', dataIndex: 'guild', key: 'guild' },
  { title: '联盟等级', dataIndex: 'guildLV', key: 'guildLV' },
  {
    title: '个人贡献值',
    dataIndex: 'personalContribution',
    key: 'personalContribution',
  },
  {
    title: '联盟信仰值',
    dataIndex: 'guildContribution',
    key: 'guildContribution',
  },
  { title: '队列数量', dataIndex: 'queueCount', key: 'queueCount' },
  { title: '护盾状态', dataIndex: 'shield', key: 'shield' },
  { title: '兵营等级', dataIndex: 'campLV', key: 'campLV' },
  { title: '城防等级', dataIndex: 'defenceLV', key: 'defenceLV' },
  { title: '良田等级', dataIndex: 'farm', key: 'farm' },
]
const assetInfoCol = [
  { title: '粮草', dataIndex: 'forage', key: 'forage' },
  { title: '木材', dataIndex: 'wood', key: 'wood' },
  { title: '石油', dataIndex: 'oil', key: 'oil' },
  { title: '一级矿', dataIndex: 'ore1', key: 'ore1' },
  { title: '二级矿', dataIndex: 'ore2', key: 'ore2' },
  { title: '三级矿', dataIndex: 'ore3', key: 'ore3' },
  { title: '四级矿', dataIndex: 'ore4', key: 'ore4' },
  { title: '五级矿', dataIndex: 'ore5', key: 'ore5' },
]
class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userBaseData: [],
      userDetailInfoData: [],
      userAssetInfoData: [],
      userOnSaleData: [],
      showType: 'none',
      showUserInfo: false,
    }
  }
  async componentWillMount() {}
  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        var [data] = await getUserBaseInfo({ uid: values.id })
        console.log(data, JSON.stringify(data.user.science))
        const user = data.user
        var sells={}
         if(data.sells)
         {
           data.sells.forEach(element => {
             if(!sells[element.item_id])
             sells[element.item_id]=0
             sells[element.item_id]+=element.item_count
           });
         }
   
        this.setState({
          showUserInfo: true,
          showType: 'none',
          userBaseData: [
            {
              id: data.user._id,
              castle: data.user.castle.level,
              vip: data.user.vip,
              EOS: 0,
              itemEOS: 0,
              registerTime: moment(data.user.reg_time).format(
                'YYYY/MM/DD HH:mm:ss',
              ),
              lastLoginTime: 0,
            },
          ],
          userDetailInfoData: [
            {
              millLV: data.user.mill.level,
              mineLV: data.user.mine.level,
              tecLV: JSON.stringify(data.user.science) || 0,
              guild: (data.guild && data.guild.name) || '无',
              guildLV: data.guild ? data.guild.main.level : '无',
              personalContribution: data.guild_member
                ? data.guild_member.contribute
                : '无',
              guildContribution: data.guild ? data.guild.alter.faith : '无',
              queueCount: data.user.queue_limit,
              shield:
                data.activities.findIndex(item => {
                  return item.type == 8
                }) == -1
                  ? '未开启'
                  : '开启中',
              campLV: data.user.camp.level,
              defenceLV: data.user.defence.level,
              farm: data.user.farm.level,
            },
          ],
          userAssetInfoData: [
            {
              forage: user.bag.forage || 0,
              wood: user.bag.wood || 0,
              oil: user.bag.oil || 0,
              ore1: user.bag.ore1 || 0,
              ore2: user.bag.ore2 || 0,
              ore3: user.bag.ore3 || 0,
              ore4: user.bag.ore4 || 0,
              ore5: user.bag.ore5 || 0,
            },
          ],
          userOnSaleData: [
            {
              forage: sells['forage']||0,
              wood: sells['wood']||0,
              oil: sells['oil']||0,
              ore1: sells['ore1']||0,
              ore2: sells['ore2']||0,
              ore3: sells['ore3']||0,
              ore4: sells['ore4']||0,
              ore5: sells['ore5']||0,
            },
          ],
        })
      }
    })
  }
  handleLogSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  handleDetail = e => {
    console.log('detail')
    this.setState({ showType: 'detail' })
  }
  handleLog = e => {
    console.log('log')
    this.setState({ showType: 'log' })
  }
  handleLogDateChange = e => {
    console.log(e)
  }
  showUserInfoView = () => {
    if (this.state.showUserInfo) {
      return (
        <div>
          <br />
          <Row>
            <Col span={2}>
              <h3>玩家信息:</h3>
            </Col>
            <Col span={17}>
              <Table
                bordered={true}
                dataSource={this.state.userBaseData}
                columns={userBaseDataCol}
                rowKey="id"
                pagination={false}
                size="small"
              />
            </Col>
            <Col span={4}>
              <Button size="large" type="Default" onClick={this.handleDetail}>
                详情
              </Button>
              <Button size="large" type="Default" onClick={this.handleLog}>
                日志
              </Button>
            </Col>
          </Row>
        </div>
      )
    }
  }
  selectShowView = () => {
    const { getFieldDecorator } = this.props.form
    let type = this.state.showType
    if (type == 'detail') {
      return (
        <div>
          <br />
          <br />
          <Row>
            <Col span={2}>
              <h3>玩家详情:</h3>
            </Col>
            <Col span={22}>
              <Table
                bordered={true}
                dataSource={this.state.userDetailInfoData}
                columns={userDetailInfoCol}
                rowKey="millLV"
                pagination={false}
                size="small"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={2}>
              <h3>资产信息:</h3>
            </Col>
            <Col span={22}>
              <Table
                bordered={true}
                dataSource={this.state.userAssetInfoData}
                columns={assetInfoCol}
                rowKey="forage"
                pagination={false}
                size="small"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={2}>
              <h3>在售信息:</h3>
            </Col>
            <Col span={22}>
              <Table
                bordered={true}
                dataSource={this.state.userOnSaleData}
                columns={assetInfoCol}
                rowKey="forage"
                pagination={false}
                size="small"
              />
            </Col>
          </Row>
        </div>
      )
    } else if (type == 'log') {
      return (
        <div>
          <span>
            <br />
            <br />
            <br />
            <Form layout="inline" onSubmit={this.handleLogSubmit}>
              <Form.Item>
                {getFieldDecorator('logtype', { initialValue: 'all' })(
                  <Select>
                    <Option value="all">资源/道具/兵力/CT日志</Option>
                    <Option value="asset">资源日志</Option>
                    <Option value="item">道具日志</Option>
                    <Option value="troop">兵力日志</Option>
                    <Option value="ct">CT日志</Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="原因">
                {getFieldDecorator('logreason', { initialValue: 'all' })(
                  <Select>
                    <Option value="all">全部</Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="时间">
                {getFieldDecorator('logtime', {
                  initialValue: [
                    moment(Date.now() - 1 * 24 * 60 * 60 * 1000),
                    moment(Date.now()),
                  ],
                })(
                  <RangePicker
                    ranges={{
                      Today: [moment(), moment()],
                      'This Month': [
                        moment().startOf('month'),
                        moment().endOf('month'),
                      ],
                    }}
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={this.handleLogDateChange}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Form.Item>
            </Form>
          </span>
        </div>
      )
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '请输入玩家账号！' }],
            })(
              <Input
                prefix={<Icon type="user" />}
                placeholder="玩家账号"
                style={{ width: 200 }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('server', { initialValue: [server[0].id] })(
              <ServerSelect style={{ width: 160 }} />,
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
        {this.showUserInfoView()}
        {this.selectShowView()}
      </div>
    )
  }
}
export default withRouter(Form.create({ name: 'search_userinfo' })(UserInfo))
