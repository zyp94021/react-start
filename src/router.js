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
        defaultSelect: true,
        component: <Todo span={1} />
      },
      {
        path: 'todo2',
        title: 'todo2',
        component: <Todo span={2} />
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
        component: <Todo span={3} />
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
                component: <Todo span={4} />
              },
              {
                path: 'todo8',
                title: 'todo8',
                component: <Todo span={5} />
              }
            ]
          },
          {
            path: 'todo6',
            title: 'todo6',
            component: <Todo span={6} />
          }
        ]
      }
    ]
  }
]
function addPath(routers, router) {
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
export default addPath(router)
//path
//component
//children
