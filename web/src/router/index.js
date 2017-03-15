import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
        },
         {
          path: '/books',
          name: 'books',
          component: require('../components/books'),
        },
         {
          path: '/pictures',
          name: 'pictures',
          component: require('../components/pictures'),
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
