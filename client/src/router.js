import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const lazyComponent = (name) => () => import(`@/components/${name}.vue`)
export const lazyView = (name) => () => import(`@/views/${name}.vue`)

const defaultRouter = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
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

  const token = ''
  if (token) {
    next()
  } else {
    next({ name: 'signin' })
  }
})

export default defaultRouter
