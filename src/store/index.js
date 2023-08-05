import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import VuexPersistence from 'vuex-persist'//解决页面刷新数据清空问题

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const store = new Vuex.Store({
  modules: {
    app
  },
  getters,
  plugins: [vuexLocal.plugin]
})

export default store
