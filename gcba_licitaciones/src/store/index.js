import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8082/api'
import createPersistedState from 'vuex-persistedstate'
import router from '../router/index'


Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState({
    storage: window.sessionStorage,
  })],

  state: {
    types: [],
    status:[],
    contractor: [],
    user: null,
    error: {type: null, message: null},
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
      SPO: 0,
      Contractor: null,
      ContractDate: "",
      ProcedureDays: "",
      Observations: ""
    },
    pliegos:[],
  },
  
  getters: {
    authUser(state){
      return !!state.user
    }
  },
  mutations: {
    setError(state, payload){
      if(payload === null){
        return state.error = {type: null, message: null}
      }
      if(payload === "USER_NOT_FOUND"){
        return state.error = {type: 'user', message: 'Usuario no encontrado'}
      }
      if(payload === "INVALID_PASSWORD"){
        return state.error = {type: 'password', message: 'Contraseña invalida'}
      }
      
      if(payload === "DATABASE_ERROR"){
        return state.error = {type: 'database', message: 'Error de la base de datos'}
      }

      if(payload === "USUARIO_CREADO_CORRECTAMENTE"){
        return state.error = {type: 'Login', message: 'Usuario creado correctamente'}
      }
    },

    setUser(state, payload){
      state.user = payload
    },

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

    contractorFromNameToId(state){
      let idContractor = ""
      state.contractor.forEach(contractor => contractor.Name === state.bidding.Contractor ? idContractor = contractor._id : 0)
      state.bidding.Contractor = idContractor
    },

    getContractorIdFromName(state){
      let nameContractor = ""
      state.contractor.forEach(contractor => contractor._id === state.bidding.Contractor ? nameContractor = contractor.Name : 0)
      return nameContractor
    },

    removeFormatCurrency(state){
      state.bidding.AllocatedBudget = state.bidding.AllocatedBudget.split('.').join("")
      state.bidding.AllocatedBudget = state.bidding.AllocatedBudget.split(',').join("")
      state.bidding.AllocatedBudget = (parseInt(state.bidding.AllocatedBudget.substring(2)) / 100).toFixed(2)

      state.bidding.OfficialBudget = state.bidding.OfficialBudget.split('.').join("")
      state.bidding.OfficialBudget = state.bidding.OfficialBudget.split(',').join("")
      state.bidding.OfficialBudget = (parseInt(state.bidding.OfficialBudget.substring(2)) / 100).toFixed(2)
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
        OfficialBudget: "",
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
        AllocatedBudget: "",
        SPO: 0,
        Contractor: "",
        ContractDate: "",
        ProcedureDays: "",
        Observations: ""
      }
    }
  },
  actions: {

    async logIn({commit}, user){
      try {
        console.log(user);
        const userDB = await axios.post('http://localhost:8082/api/auth/login', {
          UserName: user.user,
          Password: user.password
        })

        if(userDB.data.error){
          commit('setError', userDB.data.error)
          return
        }

        commit('setUser', userDB.data)
        router.push('/')
        sessionStorage.setItem('user', JSON.stringify(userDB.data))
      } 
      catch (error) {
        console.log('error', error)        
      }
    },

    logOut({commit}){
      commit('setUser', null)
      router.push('/login')
      sessionStorage.clear()
    },

    async register({commit}, usuario){
      console.log("🚀 ~ file: index.js ~ line 100 ~ register ~ newUser", usuario)
      try {
        const res = await axios({
          method: 'post',
          url: 'http://localhost:8082/api/auth/register',
          data: {
            UserName: usuario.user,
            Password: usuario.password,
            Cuit: usuario.cuit,
            FullName: usuario.fullName,
            SecretKey: usuario.secretKey
          }
        })
        router.push('/login')
        commit('setError', "USUARIO_CREADO_CORRECTAMENTE")
      } 
      catch (error) {
        console.log(error)
      }
    },

    loadEditPliego({commit, state}, pliego){
      pliego.CallDate ? pliego.CallDate = pliego.CallDate.substring(0,10) : ""
      pliego.EntryDocumentReview ? pliego.EntryDocumentReview = pliego.EntryDocumentReview.substring(0,10) : ""
      pliego.ExitDocumentReview ? pliego.ExitDocumentReview = pliego.ExitDocumentReview.substring(0,10) : ""
      pliego.FirstPG ? pliego.FirstPG = pliego.FirstPG.substring(0,10) : ""
      pliego.FirstLapPG ? pliego.FirstLapPG = pliego.FirstLapPG.substring(0,10) : ""
      pliego.PreAdjudgmentActDate ? pliego.PreAdjudgmentActDate = pliego.PreAdjudgmentActDate.substring(0,10) : ""
      pliego.SecondPG ? pliego.SecondPG = pliego.SecondPG.substring(0,10) : ""
      pliego.SecondLapPG ? pliego.SecondLapPG = pliego.SecondLapPG.substring(0,10) : ""
      pliego.ApproveDate ? pliego.ApproveDate = pliego.ApproveDate.substring(0,10) : ""
      pliego.ContractDate ? pliego.ContractDate = pliego.ContractDate.substring(0,10) : ""
      
      let nameContractor = ""
      state.contractor.forEach(contractor => contractor._id === pliego.Contractor ? nameContractor = contractor.Name : 0)
      pliego.Contractor = nameContractor

      commit('setBidding', pliego)
    },

    async getPliegos({commit}){
      try{
        let pliegos = await axios({
          method: 'get',
          url: '/bidding',
        })
        commit('setPliego', pliegos.data)
        commit('cleanPliego')
      }
      catch(err){
        console.log(err)
      }
    },

    async setPliego({commit, state, dispatch}){
      commit('contractorFromNameToId')
      try {
        let res = await axios.post('/bidding/add',{bidding: state.bidding})
        console.log("🚀 ~ file: index.js ~ line 105 ~ setPliego ~ res", res)
      } catch (error) {
        console.log(error)
      }
    },

    async editPliego({commit, state, dispatch}){
      commit('contractorFromNameToId')
      try {
        let res = await axios({
          method: 'POST',
          url: '/bidding/edit',
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
          url: '/statistics/statusDate',
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
          url: '/statistics/biddingType',
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
          url: '/statistics/statusCount',
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
          url: '/statistics/biddingByContractor',
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
          url: '/statistics/budget',
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
        url: `/save/${data.dataType}/delete`,
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
          url: '/save/type',
        })

        let status = await axios({
          method: 'GET',
          url: '/save/status',
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
          url: `/save/${data.dataType}/save`,
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
          url: `/contractor/`,
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
          url: `/contractor/delete`,
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
          url: `/contractor/add`,
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
          url: `/contractor/edit`,
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
    },

    cleanError({commit}){
      commit('setError', null)
    },

  },
  modules: {
  }
})
