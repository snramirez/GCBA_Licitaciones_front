import axios from "axios";
import Days from "../../Helpers/Days";
import router from "../../router/index";
axios.defaults.baseURL = "http://localhost:8082/api";

export default {
  namespaced: true,
  state: {
    types: [],
    status: [],
    holidays: [],
    contractor: [],
    biddingService: {
      BiddingNumber: "",
      Record: "",
      RecordBAC: "",
      Bidding: "",
      Responsable: "",
      Division: "",
      BiddingType: "",
      DirectContractType: "",
      DocumentationComplete: false,
      OfficialBudget: 0,
      Status: "",
      DocumentEntryDate: "",
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
      Extension: false,
      ExtensionData: {
        ExtensionCode: "",
        ExtensionDate: "",
        Budget: 0,
      },
      Prorogation: false,
      ProrogationExpired: "",
      ProcedureDays: "",
      Observations: "",
    },
    pliegos: [],
  },

  mutations: {
    cleanPliego(state) {
      state.biddingService = {
        BiddingNumber: "",
        Record: "",
        RecordBAC: "",
        Bidding: "",
        Responsable: "",
        Division: "",
        BiddingType: "",
        DirectContractType: "",
        DocumentationComplete: false,
        OfficialBudget: 0,
        Status: "",
        DocumentEntryDate: "",
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
        Extension: false,
        ExtensionData: {
          ExtensionCode: "",
          ExtensionDate: "",
          Budget: 0,
        },
        Prorogation: false,
        ProrogationExpired: "",
        ProcedureDays: "",
        Observations: "",
      };
    },

    setContractor(state, contractor) {
      state.contractor = contractor;
    },

    contractorFromNameToId(state) {
      let idContractor = "";
      state.contractor.forEach((contractor) =>
        contractor.Name === state.biddingService.Contractor
          ? (idContractor = contractor._id)
          : 0
      );
      state.biddingService.Contractor = idContractor;
    },

    getContractorIdFromName(state) {
      let nameContractor = "";
      state.contractor.forEach((contractor) =>
        contractor._id === state.biddingService.Contractor
          ? (nameContractor = contractor.Name)
          : 0
      );
      return nameContractor;
    },

    setTypes(state, types) {
      state.types = types;
    },

    setStatus(state, status) {
      state.status = status;
    },

    setHolidays(state, holidays) {
      state.holidays = holidays;
    },
  },

  actions: {

    async setPliego({ commit, state }) {
      commit("contractorFromNameToId");
      try {
        let res = await axios.post("/biddingService/add", { bidding: state.biddingService });
        console.log("🚀 ~ file: index.js ~ line 105 ~ setPliego ~ res", res);
      } catch (error) {
        console.log(error);
      }
      router.push("/");
    },

    async deleteData({ commit, dispatch }, data) {
      try {
        let res = await axios({
          method: "POST",
          url: `/saveBiddingService/${data.dataType}/delete`,
          params: { data: data.data },
        });
        dispatch("getData");
      } catch (error) {
        console.log(error);
      }
    },

    async getData({ commit }) {
      try {
        let types = await axios({
          method: "GET",
          url: "/saveBiddingService/type",
        });

        let status = await axios({
          method: "GET",
          url: "/saveBiddingService/status",
        });

        let holidays = await axios({
          method: "GET",
          url: "/saveBiddingService/holiday",
        });

        commit("setTypes", types.data);
        commit("setStatus", status.data);
        commit("setHolidays", holidays.data);
      } catch (error) {
        console.log(error);
      }
    },

    async saveData({ commit, dispatch }, data) {
      try {
        let res = await axios({
          method: "POST",
          url: `/saveBiddingService/${data.dataType}/save`,
          params: { data: data.data },
        });
        dispatch("getData");
      } catch (error) {
        console.log(error);
      }
    },

    async getContractor({ commit }) {
      try {
        let res = await axios({
          method: "GET",
          url: `/contractor/`,
          params: {type: 'SERVICIOS'}
        });
        console.log(res.data);
        commit("setContractor", res.data);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteContractor({ commit, dispatch }, contractorId) {
      try {
        let res = await axios({
          method: "POST",
          url: `/contractor/delete`,
          data: { id: contractorId },
        });
        console.log(res.data);
        dispatch("getContractor");
      } catch (error) {
        console.log(error);
      }
    },

    async saveContractor({ commit, dispatch }, contractor) {
      contractor.Type = 'SERVICIOS'
      try {
        let res = await axios({
          method: "POST",
          url: `/contractor/add`,
          data: { contractor },
        });
        console.log(res.data);
        dispatch("getContractor");
      } catch (error) {
        console.log(error);
      }
    },

    async editContractor({ commit, dispatch }, data) {
      try {
        let res = await axios({
          method: "POST",
          url: `/contractor/edit`,
          data: {
            id: data.id,
            data: data.data,
          },
        });
        console.log(res.data);
        dispatch("getContractor");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
