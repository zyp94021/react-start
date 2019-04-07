import React, { Component } from 'react'
import './home.scss'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router'
import routers from '../router'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: '',
      openKeys: []
    }
  }
  defaultOpenMenu = []
  defaultSelectMenu = undefined

  handleClick = ({ item, key, keyPath }) => {
    this.props.history.push(`${this.props.match.path}/${key}`)
  }

  defaultOpen = () => {
    return (this.defaultSelectMenu =
      this.defaultSelectMenu || this.findDefaultOpen(routers))
  }

  findDefaultOpen = (routers, now_router) => {
    for (let i = 0; i < routers.length; i++) {
      const router = routers[i]
      this.defaultOpenMenu.push(router)
      if (router.defaultSelect) return now_router || router

      if (router.children && router.children.length > 0) {
        const temp_router = this.findDefaultOpen(router.children, router)
        if (temp_router) return temp_router
      }
      this.defaultOpenMenu.pop(router)
    }
    return
  }

  defaultOpenKeys = () => {
    return this.defaultOpenMenu.map(router => router.path)
  }

  defaultSelectedKeys = () => [
    this.defaultOpen().children.find(item => item.defaultSelect).path
  ]

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
          render={({ match }) => this.renderRoute(match, item)}
        />
      )
    )
  renderRoute = (match, item) => {
    console.log(match)
    
    // this.setState({selectedKeys:item.path,openKeys:item.paths.reverse()})
    return item.component
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={this.defaultSelectedKeys()}
            defaultOpenKeys={this.defaultOpenKeys()}
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
