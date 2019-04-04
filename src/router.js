import React from 'react'
import Todo from './todo/Todo'
import { Icon } from 'antd'
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
        path: 'todo1',
        title: 'todo1',
        component: <Todo />
      },
      {
        path: 'todo2',
        title: 'todo2',
        component: <Todo />
      }
    ]
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
        component: <Todo />
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
                component: <Todo />
              },
              {
                path: 'todo8',
                title: 'todo8',
                defaultSelect: true,
                component: <Todo />
              }
            ]
          },
          {
            path: 'todo6',
            title: 'todo6',
            component: <Todo />
          }
        ]
      }
    ]
  }
]
export default router
//path
//component
//children
