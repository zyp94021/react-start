import * as React from 'react'
import Chat from './pages/chat/Chat'
import Todo from './pages/todo/Todo'

const router = [
  {
    path: 'chat',
    title: 'chat',
    component: Chat,
  },
  {
    path: 'todo',
    title: 'todo',
    defaultSelect: true,
    component: Todo,
  },
]
const addPath = (routers, router = undefined) => {
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

const findDefaultOpen = (routers, now_router = undefined) => {
  for (let i = 0; i < routers.length; i++) {
    const router = routers[i]
    defaultOpenMenu.push(router)
    if (router.defaultSelect) return now_router || router

    if (router.children && router.children.length > 0) {
      const temp_router = findDefaultOpen(router.children, router)
      if (temp_router) return temp_router
    }
    defaultOpenMenu.pop()
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
