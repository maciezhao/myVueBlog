import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    app,
    user
  }
})
