import React from 'react'
import { Icon } from 'antd'
import UserCTHoldings from '@pages/UserCTHoldings/UserCTHoldings'
import GeneralData from '@pages/GeneralData/index'
import SendMail from '@pages/Mail/SendMail'
import UserInfo from '@pages/UserInfo/UserInfo'
import ResInfo from '@pages/GeneralData/ResInfo'
import DevInfo from '@pages/DevelopData/index'
import BatInfo from '@pages/CombatData/index'
import TransInfo from '@pages/TransactionData'
import MailHistroy from '@pages/Mail/MailHistroy'
const router = [
  {
    path: 'general',
    title: '常规数据',
    children: [
      {
        path: 'day',
        title: '日常数据',
        defaultSelect: true,
        component: <GeneralData />,
      },
      {
        path: 'res',
        title: '资源产耗',
        component: <ResInfo />,
      },
    ],
  },
  {
    path: 'develop',
    title: '养成数据',
    component: <DevInfo />,
  },
  {
    path: 'combat',
    title: '战斗数据',
    component: <BatInfo />,
  },
  {
    path: 'transaction',
    title: '交易数据',
    component: <TransInfo />,
  },
  {
    path: 'userctholdings',
    title: '用户CT持仓情况',
    component: <UserCTHoldings />,
  },
  {
    path: 'menu2',
    title: (
      <span>
        <span>用户信息查询</span>
      </span>
    ),
    children: [
      {
        path: 'UserInfo',
        title: '用户信息',
        component: <UserInfo />,
      },
      {
        path: 'SendMail',
        title: '发送邮件',
        component: <SendMail />,
      },
      {
        path: 'MailHistroy',
        title: '邮件记录',
        component: <MailHistroy />,
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
  defaultOpen().children
    ? defaultOpen().children.find(item => item.defaultSelect).path
    : defaultOpen().path,
]

export const routers = addPath(router)
export const selectedKeys = defaultSelectedKeys()
export const openKeys = defaultOpenKeys()
