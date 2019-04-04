import React, { Component } from 'react'
import './home.scss'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router'
import router from '../router'
import Chat from '../chat/Chat'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const routers = key => {
  const router = { [key]: <span>{key}</span>, chat: <Chat /> }
  return router[key]
}
class Home extends Component {
  handleClick = ({ item, key, keyPath }) => {
    console.log({ item, key, keyPath })
    console.log(this.props)
    this.props.history.push(`${this.props.match.path}/${key}`)
  }
  contentRender = ({ match }) => {
    console.log(match)
    return routers(match.params.id)
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <div className="logo" />
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={[router[0].children[0].path]}
            defaultOpenKeys={[router[0].path]}
            mode="inline"
            theme="dark"
          >
            {router.map(item =>
              item.children ? (
                <SubMenu key={item.path} title={item.title}>
                  {item.children.map(item => (
                    <MenuItem key={item.path}>{item.title}</MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem key={item.path}>{item.title}</MenuItem>
              )
            )}
            {/* <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>一级导航 1</span>
                </span>
              }
            >
              <MenuItem key="1">二级导航 1</MenuItem>
              <MenuItem key="2">二级导航 2</MenuItem>
              <MenuItem key="3">二级导航 3</MenuItem>
              <MenuItem key="4">二级导航 4</MenuItem>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>一级导航 2</span>
                </span>
              }
            >
              <MenuItem key="5">二级导航 5</MenuItem>
              <MenuItem key="6">二级导航 6</MenuItem>
              <MenuItem key="7">二级导航 7</MenuItem>
              <MenuItem key="8">二级导航 8</MenuItem>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <Route
              path={this.props.match.path}
              exact
              render={() => <Redirect to={`${this.props.match.path}/1`} />}
            />
            <Route
              path={`${this.props.match.path}/:id`}
              render={this.contentRender}
            />
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
