import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  //serverApi:'http://localhost:8080',
  serverApi:'http://210.122.45.62:8080',
  // serverApi2:'http://210.122.45.62:8081',
  moduleName:'/admin',
  userId:null,
  userTypeCd:null,
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  
  
}

export default new Vuex.Store({
  state,
  mutations
})