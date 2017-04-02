import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/',
          redirect: '/list'
        },
        {
          path: '/list',
          name: 'list',
          component: require('../components/list'),
        },
        {
          path: '/community',
          name: 'community',
          component: require('../components/community'),
        },
        {
          path: '/setting',
          name: 'setting',
          component: require('../components/setting'),
        },
        {
          path: '/message/:receiver/:index',
          name: 'message',
          component: require('../pages/message'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: require('../pages/login'),
    }
  ]
})
