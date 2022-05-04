import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pliegos:[],
    statistic: []
  },
  getters: {
  },
  mutations: {
    setPliego(state, payload){
      state.pliegos = payload;
    },
    setStatistic(state, payload){
      state.statistic = payload
      console.log(state.statistic)
    }
    
  },
  actions: {
    async getPliegos({commit}){
      try{
        let pliegos = await axios({
          method: 'get',
          url: 'http://localhost:8082/api/bidding',
        })
        commit('setPliego', pliegos.data)
      }
      catch(err){
        console.log(err)
      }
    },

    async statusDate({commit}, query){      
      try {
        let res = await axios({
          method: 'get',
          url: 'http://localhost:8082/api/statistics/statusDate',
          params: { status: query[0], startDate: query[1], finishDate: query[2]}
        })
        commit('setStatistic', res.data)
      } 
      catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
