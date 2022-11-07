import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    types: [],
    status:[],
    contractor: [],
    bidding:{
      BiddingNumber: "",
      Record: "",
      RecordBAC: "",
      Bidding: "",
      Responsable: "",
      Division: "",
      BiddingType: "",
      OfficialBudget: 0,
      Status: "",
      EntryDocumentReview: "",
      ExitDocumentReview: "",
      FirstPG: "",
      FirstLapPG: "",
      CallDate: "",
      BidOpeningDate: "",
      BidQuantity: [],
      PreAdjudgmentActDate: "",
      PreAdjudgmentActNumber: "",
      SecondPG: "",
      SecondLapPG: "",
      DayQuantity: "",
      ApproveNumber: "",
      ApproveDate: "",
      AllocatedBudget: 0,
      SPO: "",
      Contractor: "",
      ContractDate: "",
      ProcedureDays: "",
      Observations: ""
    },
    pliegos:[],
  },
  getters: {
  },
  mutations: {
    setBidding(state, pliego){
      state.bidding = pliego
     },

    setContractor(state, contractor){
      state.contractor = contractor
    },

    setTypes(state, types){
      state.types = types
    },

    setStatus(state, status){
      state.status = status
    },

    setPliego(state, payload){
      state.pliegos = payload;
    },
    cleanPliego(state){
      state.bidding = {
        BiddingNumber: "",
        Record: "",
        RecordBAC: "",
        Bidding: "",
        Responsable: "",
        Division: "",
        BiddingType: "",
        OfficialBudget: 0,
        Status: "",
        EntryDocumentReview: "",
        ExitDocumentReview: "",
        FirstPG: "",
        FirstLapPG: "",
        CallDate: "",
        BidOpeningDate: "",
        BidQuantity: [],
        PreAdjudgmentActDate: "",
        PreAdjudgmentActNumber: "",
        SecondPG: "",
        SecondLapPG: "",
        DayQuantity: "",
        ApproveNumber: "",
        ApproveDate: "",
        AllocatedBudget: 0,
        SPO: "",
        Contractor: "",
        ContractDate: "",
        ProcedureDays: "",
        Observations: ""
      }
    }
  },
  actions: {
    loadEditPliego({commit}, pliego){
      commit('setBidding', pliego)
    },

    async getPliegos({commit}){
      try{
        let pliegos = await axios({
          method: 'get',
          url: 'http://localhost:8082/api/bidding',
        })
        commit('setPliego', pliegos.data)
        commit('cleanPliego')
      }
      catch(err){
        console.log(err)
      }
    },

    async setPliego({commit, state}){
      console.log("🚀 ~ file: index.js ~ line 102 ~ setPliego ~ state", state.bidding)
      try {
        let res = await axios.post('http://localhost:8082/api/bidding/add',{bidding: state.bidding})
        console.log("🚀 ~ file: index.js ~ line 105 ~ setPliego ~ res", res)
      } catch (error) {
        console.log(error)
      }
    },

    async editPliego({commit, state, dispatch}){
      try {
        let res = await axios({
          method: 'POST',
          url: 'http://localhost:8082/api/bidding/edit',
          data:{
            id: state.bidding._id,
            data: state.bidding
          }
        })
        console.log(res.data)
        dispatch('getPliegos')
      } 
      catch (error) {
        console.log(error)
      }
    },

    async statusDate({commit}, query){      
      console.log("query en store",query);
      try {
        let res = await axios({
          method: 'get',
          url: 'http://localhost:8082/api/statistics/statusDate',
          params: { status: query.status, startDate: query.startDate, finishDate: query.finishDate}
        })
        return res.data
      } 
      catch (error) {
        console.log(error)
      }
    },

    async biddingType({commit}, dates){
      try {
        let res = await axios({
          method: 'GET',
          url: 'http://localhost:8082/api/statistics/biddingType',
          params:{ startDate: dates.startDate, finishDate: dates.finishDate}
        })
        return res.data
      } catch (error) {
        console.log(error)
      }
    },

    async biddingStatus({commit}, dates){
      console.log("start",dates.startDate);
      console.log("finish", dates.finishDate);
      try {
        let res = await axios({
          method: 'GET',
          url: 'http://localhost:8082/api/statistics/statusCount',
          params:{ startDate: dates.startDate, finishDate: dates.finishDate}
        })
        console.log(res);
        return res.data
      } catch (error) {
        console.log(error)
      }
    },

    async biddingContractor({commit}, data){
      console.log("start",data.startDate);
      console.log("finish", data.finishDate);
      try {
        let res = await axios({
          method: 'GET',
          url: 'http://localhost:8082/api/statistics/biddingByContractor',
          params:{ startDate: data.startDate, finishDate: data.finishDate, contractor: data.contractor}
        })
        console.log(res);
        return res.data
      } catch (error) {
        console.log(error)
      }
    },

    async biddingBudget({commit}, data){
      console.log("start",data.startDate);
      console.log("finish", data.finishDate);
      try {
        let res = await axios({
          method: 'GET',
          url: 'http://localhost:8082/api/statistics/budget',
          params:{ 
            startDate: data.startDate, 
            finishDate: data.finishDate, 
            budgetType: data.budget,
            botBudget: data.botBudget,
            topBudget: data.topBudget
          }
        })
        return res.data
      } catch (error) {
        console.log(error)
      }
    },

    async deleteData({commit, dispatch}, data){
      try {
        let res = await axios({
        method: 'POST',
        url: `http://localhost:8082/api/save/${data.dataType}/delete`,
        params: {data: data.data}
        })
        dispatch('getData') 
      } 
      catch (error) {
        console.log(error)  
      }
    },

    async getData({commit}){
      try {
        let types = await axios({
          method: 'GET',
          url: 'http://localhost:8082/api/save/type',
        })

        let status = await axios({
          method: 'GET',
          url: 'http://localhost:8082/api/save/status',
        })
        console.log(types.data)
      commit('setTypes', types.data)
      commit('setStatus', status.data)
      } 
      catch (error) {
        console.log(error)
      }
    },

    async saveData({commit, dispatch}, data){
      try {
        let res = await axios({
          method: 'POST',
          url: `http://localhost:8082/api/save/${data.dataType}/save`,
          params: {data: data.data}
        })
        dispatch('getData') 
      } 
      catch (error) {
        console.log(error)  
      }
    },
    
    async getContractor({commit}){
      try {
        let res = await axios({
          method: 'GET',
          url: `http://localhost:8082/api/contractor/`,
        })
        console.log(res.data)
        commit('setContractor', res.data)
      }
      catch (error) {
        console.log(error)  
      }
    },

    async deleteContractor({commit, dispatch}, contractorId){
      try {
        let res = await axios({
          method: 'POST',
          url: `http://localhost:8082/api/contractor/delete`,
          data:{id: contractorId}
        })
        console.log(res.data)
        dispatch('getContractor')
      }
      catch (error) {
        console.log(error)  
      }
    },

    async saveContractor({commit, dispatch}, contractor){
      try {
        let res = await axios({
          method: 'POST',
          url: `http://localhost:8082/api/contractor/add`,
          data:{contractor}
        })
        console.log(res.data)
        dispatch('getContractor')
      }
      catch (error) {
        console.log(error)  
      }
    },

    async editContractor({commit, dispatch}, data){
      console.log(data)
      try {
        let res = await axios({
          method: 'POST',
          url: `http://localhost:8082/api/contractor/edit`,
          data:{
            id: data.id,
            data: data.data
          }
        })
        console.log(res.data)
        dispatch('getContractor')
      }
      catch (error) {
        console.log(error)  
      }
    }
  },
  modules: {
  }
})
