// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mixins from './mixins/base'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import * as directives from './directives'
import * as filters from './filters'

Vue.config.productionTip = false

Vue.use(iView)

Object.keys(directives).forEach(k => Vue.directive(k, directives[k]))
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
