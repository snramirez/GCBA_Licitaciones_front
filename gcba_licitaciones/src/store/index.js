import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import bidding from './modules/bidding'
import biddingService from './modules/biddingService'
import auth from './modules/auth'


Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState({
    storage: window.sessionStorage,
  })],
  
  modules: {
    bidding,
    biddingService,
    auth,
  }
})
