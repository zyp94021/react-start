import React from 'react'
import Chat from './chat/Chat'
import { Icon } from 'antd'
const router = [
  {
    path: '1',
    title: (
      <span>
        <Icon type="mail" />
        <span>一级导航 1</span>
      </span>
    ),
    children: [
      {
        path: '11',
        title: '二级导航 1',
        component: Chat
      }
    ]
  }
]
export default router
//path
//component
//children
