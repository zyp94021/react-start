import React, { Component } from 'react'
import './home.scss'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router'
import { routers, openKeys, selectedKeys } from '../router'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class Home extends Component {
  constructor(props) {
    super(props)
  }
  openKeys = []
  selectedKeys = undefined
  handleClick = ({ item, key, keyPath }) => {
    this.props.history.push(`${this.props.match.path}/${key}`)
    console.log('--',key,keyPath)
    // this.props.history.push(`${this.props.match.path}/userctholdings`)
  }

  renderMenu = routers =>
    routers.map(item =>
      (item.children && item.children.length) > 0 ? (
        <SubMenu key={item.path} title={item.title}>
          {this.renderMenu(item.children)}
        </SubMenu>
      ) : (
        <MenuItem key={item.path}>{item.title}</MenuItem>
      )
    )
  createRoute = routers =>
    routers.map(item =>
      (item.children && item.children.length) > 0 ? (
        this.createRoute(item.children)
      ) : (
        <Route
          path={`${this.props.match.path}/${item.path}`}
          render={() => item.component}
        />
      )
    )
  componentWillMount() {
    const location = this.props.location.pathname
    const match = this.props.match.path
    if (location === match) {
      this.props.history.push(`${match}/${selectedKeys}`)
      this.openKeys = openKeys
      this.selectedKeys = selectedKeys
    } else {
      const path = location.replace(`${match}/`, '')
      this.selectedKeys = [path]
      const paths = path.split('/')
      this.joinPath(paths)
      this.openKeys = this.paths
    }
  }
  paths = []
  joinPath(paths) {
    paths.pop()
    if (paths.length > 1) {
      this.paths.unshift(paths.reduce((a, b) => `${a}/${b}`))
      this.joinPath(paths)
    } else {
      this.paths.unshift(paths.pop())
    }
  }
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={this.selectedKeys}
            defaultOpenKeys={this.openKeys}
            mode="inline"
            theme="dark"
          >
            {this.renderMenu(routers)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <span style={{ marginLeft: '40px' }}>标题</span>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <Switch>{this.createRoute(routers)}</Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default withRouter(Home)
