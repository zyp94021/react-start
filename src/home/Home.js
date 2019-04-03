import React, { Component } from "react"
import "./home.scss"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import { Layout, Menu, Icon } from "antd"
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
export default class Home extends Component {
  handleClick = ({ item, key, keyPath }) => {
    console.log({ item, key, keyPath })
  }
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={broken => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <div className='logo' />
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode='inline'
            theme='dark'
          >
            <SubMenu
              key='sub1'
              title={
                <span>
                  <Icon type='mail' />
                  <span>Navigation One</span>
                </span>
              }
            >
              <MenuItemGroup key='g1' title='Item 1'>
                <Menu.Item key='1'>Option 1</Menu.Item>
                <Menu.Item key='2'>Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup key='g2' title='Item 2'>
                <Menu.Item key='3'>Option 3</Menu.Item>
                <Menu.Item key='4'>Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu
              key='sub2'
              title={
                <span>
                  <Icon type='appstore' />
                  <span>Navigation Two</span>
                </span>
              }
            >
              <Menu.Item key='5'>Option 5</Menu.Item>
              <Menu.Item key='6'>Option 6</Menu.Item>
              <SubMenu key='sub3' title='Submenu'>
                <Menu.Item key='7'>Option 7</Menu.Item>
                <Menu.Item key='8'>Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key='sub4'
              title={
                <span>
                  <Icon type='setting' />
                  <span>Navigation Three</span>
                </span>
              }
            >
              <Menu.Item key='9'>Option 9</Menu.Item>
              <Menu.Item key='10'>Option 10</Menu.Item>
              <Menu.Item key='11'>Option 11</Menu.Item>
              <Menu.Item key='12'>Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              content
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
