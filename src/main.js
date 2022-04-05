import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'

import { iconsSet as icons } from './assets/icons/icons.js'
import 'regenerator-runtime/runtime'
import store from './store'
import axios from 'axios'
import moment from 'vue-moment'
//import CoreuiVue from '@coreui/vue'
const topMenu = () => import('@/containers/TopMenu.vue')


Vue.use(moment)


Vue.config.performance = true
//Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.component('topMenu', topMenu)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  axios,
  template: '<App/>',
  components: {
    App
  }
})
