import React from 'react'
import Todo from './todo/Todo'
import { Icon } from 'antd'
import { UserCTHoldings } from './UserCTHoldings/UserCTHoldings'
import GeneralData from '@pages/GeneralData/index'
const router = [
  {
    path: 'menu1',
    title: (
      <span>
        <Icon type="mail" />
        <span>一级导航 1</span>
      </span>
    ),
    children: [
      {
        path: 'userctholdings',
        title: '用户CT持仓情况',
        defaultSelect: true,
        component: <UserCTHoldings span={1} />,
      },
      {
        path: 'GeneralData',
        title: '常规数据',
        component: <GeneralData />,
      },
    ],
  },
  {
    path: 'menu2',
    title: (
      <span>
        <Icon type="mail" />
        <span>一级导航 2</span>
      </span>
    ),
    children: [
      {
        path: 'todo3',
        title: 'todo3',
        component: <Todo span={3} />,
      },
      {
        path: 'todo4',
        title: 'todo4',
        children: [
          {
            path: 'todo5',
            title: 'todo5',
            children: [
              {
                path: 'todo7',
                title: 'todo7',
                component: <Todo span={4} />,
              },
              {
                path: 'todo8',
                title: 'todo8',
                component: <Todo span={5} />,
              },
            ],
          },
          {
            path: 'todo6',
            title: 'todo6',
            component: <Todo span={6} />,
          },
        ],
      },
    ],
  },
]
const addPath = (routers, router) => {
  return routers.map(item => {
    if (router) {
      item.path = `${router.path}/${item.path}`
      item.paths = [item.path]
      item.paths = [...router.paths, ...item.paths]
    } else {
      item.paths = [item.path]
    }
    if (item.children) {
      item.children = addPath(item.children, item)
    }
    return item
  })
}
const defaultOpenMenu = []
let defaultSelectMenu = undefined
const defaultOpen = () => {
  return (defaultSelectMenu = defaultSelectMenu || findDefaultOpen(routers))
}

const findDefaultOpen = (routers, now_router) => {
  for (let i = 0; i < routers.length; i++) {
    const router = routers[i]
    defaultOpenMenu.push(router)
    if (router.defaultSelect) return now_router || router

    if (router.children && router.children.length > 0) {
      const temp_router = findDefaultOpen(router.children, router)
      if (temp_router) return temp_router
    }
    defaultOpenMenu.pop(router)
  }
  return
}

const defaultOpenKeys = () => defaultOpenMenu.map(router => router.path)

const defaultSelectedKeys = () => [
  defaultOpen().children.find(item => item.defaultSelect).path,
]

export const routers = addPath(router)
export const selectedKeys = defaultSelectedKeys()
export const openKeys = defaultOpenKeys()
