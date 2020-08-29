import Mock from 'mockjs'
import Menus from './menu'
import User from './user'


Mock.mock('login', 'post', () => {
  return User.userInfo
})

Mock.mock('menus', 'get', () => {
  return Menus.menusInfo
})


