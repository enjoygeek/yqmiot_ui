import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: require('../pages/login'),
    }
  ]
})
