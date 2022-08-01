import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
      BidQuantity: "",
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
        BidQuantity: "",
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

    async setPliego({commit, state}){
      console.log("🚀 ~ file: index.js ~ line 102 ~ setPliego ~ state", state.bidding)
      try {
        let res = await axios.post('http://localhost:8082/api/bidding/add',{bidding: state.bidding})
        console.log("🚀 ~ file: index.js ~ line 105 ~ setPliego ~ res", res)
      } catch (error) {
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
        commit('setStatistic', res.data)
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
        console.log(res);
        console.log(res.data[0].AllocatedBudget.toString());
        return res.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  modules: {
  }
})
