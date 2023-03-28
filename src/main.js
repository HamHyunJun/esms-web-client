import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
//import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import 'regenerator-runtime/runtime'
import store from './store'
import axios from 'axios'
import moment from 'vue-moment'
import * as VueGoogleMaps from "vue2-google-maps"

// websocket
import io from 'socket.io-client';
const socket = io('http://210.122.45.47:3000', {
  transports: ["websocket"]
});
Vue.prototype.$socket = socket;
//console.log(socket)

//import CoreuiVue from '@coreui/vue'

export const eventBus = new Vue();

Vue.use(moment)
Vue.use(VueGoogleMaps, { load: { key: "AIzaSyAaffTZJsqPsb6aONllVOsz4-Kzotyyb7g", libraries: "places", region: "KR" } });


Vue.config.performance = true
//Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)


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
