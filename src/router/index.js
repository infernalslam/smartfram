import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ShowGraph from '@/components/showGraph'
import Monitor from '@/components/monitor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ShowGraph',
      name: 'ShowGraph',
      component: ShowGraph
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/monitor',
      name: 'monMonitoritor',
      component: Monitor
    }
  ]
})
