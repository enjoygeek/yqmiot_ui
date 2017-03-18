import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
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
          path: '/music',
          name: 'music',
          component: require('../components/music'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: require('../pages/login'),
    },
    {
      path: '/message/:receiver/:index',
      name: 'message',
      component: require('../pages/message'),
    }
  ]
})
