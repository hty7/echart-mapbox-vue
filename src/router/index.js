import Vue from 'vue'
import Router from 'vue-router'
import {routes} from '@/utils/const'

Vue.use(Router)

const router = new Router({routes})

router.beforeEach((to, from, next) => {
  next()
})

export default router
