import Vue from 'vue'
import Router from 'vue-router'
import APP from '@/components/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'APP',
      component: Hello
    }
  ]
})
