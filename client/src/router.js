import Vue from 'vue'
import Router from 'vue-router'
import serverApi from '@/utils/api'

Vue.use(Router)

export const lazyComponent = (name) => () => import(`@/components/${name}.vue`)
export const lazyView = (name) => () => import(`@/views/${name}.vue`)

const defaultRouter = new Router({
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: lazyView('SignIn')
    },
    {
      path: '/',
      name: 'dashboard',
      component: lazyView('Dashboard'),
      children: [
        {
          path: 'transactions',
          name: 'transactions',
          component: lazyView('Transactions'),
          children: [{
            component: lazyComponent('Transactions/Card'),
            path: ':id'
          }]
        }
      ]
    }
  ]
})

defaultRouter.beforeEach((to, from, next) => {
  if (to.name === 'signin') return next()

  if (serverApi.isLoggedIn()) {
    next()
  } else {
    next({ name: 'signin' })
  }
})

export default defaultRouter
