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
    user: null,
    error: { type: null, message: null },
    bidding: {
      BiddingNumber: "",
      Record: "",
      RecordBAC: "",
      Bidding: "",
      Responsable: "",
      Division: "",
      BiddingType: "",
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
      ProcedureDays: "",
      Observations: "",
    },
    pliegos: [],
  },

  mutations: {
    setBidding(state, pliego) {
      state.bidding = pliego;
    },

    setContractor(state, contractor) {
      state.contractor = contractor;
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

    setPliego(state, payload) {
      state.pliegos = payload;
    },

    contractorFromNameToId(state) {
      let idContractor = "";
      state.contractor.forEach((contractor) =>
        contractor.Name === state.bidding.Contractor
          ? (idContractor = contractor._id)
          : 0
      );
      state.bidding.Contractor = idContractor;
    },

    getContractorIdFromName(state) {
      let nameContractor = "";
      state.contractor.forEach((contractor) =>
        contractor._id === state.bidding.Contractor
          ? (nameContractor = contractor.Name)
          : 0
      );
      return nameContractor;
    },

    cleanPliego(state) {
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
        AllocatedBudget: "",
        SPO: 0,
        Contractor: "",
        ContractDate: "",
        ProcedureDays: "",
        Observations: "",
      };
    },
  },

  actions: {
    loadEditPliego({ commit, state }, pliego) {      
      pliego.CallDate
        ? (pliego.CallDate = pliego.CallDate.substring(0, 10))
        : "";

      pliego.BidOpeningDate
        ? (pliego.BidOpeningDate = pliego.BidOpeningDate.substring(0, 10))
        : "";

      pliego.DocumentEntryDate
        ? (pliego.DocumentEntryDate = pliego.DocumentEntryDate.substring(0, 10))
        : "";

      pliego.EntryDocumentReview
        ? (pliego.EntryDocumentReview = pliego.EntryDocumentReview.substring(0,10))
        : "";

      pliego.ExitDocumentReview
        ? (pliego.ExitDocumentReview = pliego.ExitDocumentReview.substring(0,10))
        : "";

      pliego.FirstPG ? (pliego.FirstPG = pliego.FirstPG.substring(0, 10)) : "";
      
      pliego.FirstLapPG
        ? (pliego.FirstLapPG = pliego.FirstLapPG.substring(0, 10))
        : "";
      
        pliego.PreAdjudgmentActDate
        ? (pliego.PreAdjudgmentActDate = pliego.PreAdjudgmentActDate.substring(0,10))
        : "";
      
        pliego.SecondPG
        ? (pliego.SecondPG = pliego.SecondPG.substring(0, 10))
        : "";
      pliego.SecondLapPG
        ? (pliego.SecondLapPG = pliego.SecondLapPG.substring(0, 10))
        : "";
      pliego.ApproveDate
        ? (pliego.ApproveDate = pliego.ApproveDate.substring(0, 10))
        : "";
      pliego.ContractDate
        ? (pliego.ContractDate = pliego.ContractDate.substring(0, 10))
        : "";

      let nameContractor = "";
      state.contractor.forEach((contractor) =>
        contractor._id === pliego.Contractor
          ? (nameContractor = contractor.Name)
          : 0
      );
      pliego.Contractor = nameContractor;

      commit("setBidding", pliego);
    },

    async getPliegos({ commit }) {
      try {
        let pliegos = await axios({
          method: "get",
          url: "/bidding",
        });
        commit("setPliego", pliegos.data);
        commit("cleanPliego");
      } catch (err) {
        console.log(err);
      }
    },

    async setPliego({ commit, state, dispatch }) {
      commit("contractorFromNameToId");
      try {
        let res = await axios.post("/bidding/add", { bidding: state.bidding });
        console.log("🚀 ~ file: index.js ~ line 105 ~ setPliego ~ res", res);
      } catch (error) {
        console.log(error);
      }
      router.push("/");
    },

    async editPliego({ commit, state, dispatch }) {
      commit("contractorFromNameToId");
      try {
        let res = await axios({
          method: "POST",
          url: "/bidding/edit",
          data: {
            id: state.bidding._id,
            data: state.bidding,
          },
        });
        console.log(res.data);
        dispatch("getPliegos");
      } catch (error) {
        console.log(error);
      }
      router.go();
    },

    async deletePliego({ commit, state, dispatch }, id) {
      try {
        let res = await axios({
          method: "POST",
          url: "/bidding/delete",
          data: {
            id: id,
          },
        });
        console.log(res.data);
        dispatch("getPliegos");
      } catch (error) {
        console.log(error);
      }
      router.go();
    },

    async statusDate({ commit }, query) {
      try {
        let res = await axios({
          method: "get",
          url: "/statistics/statusDate",
          params: {
            status: query.status,
            startDate: query.startDate,
            finishDate: query.finishDate,
          },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async biddingType({ commit }, dates) {
      try {
        let res = await axios({
          method: "GET",
          url: "/statistics/biddingType",
          params: { startDate: dates.startDate, finishDate: dates.finishDate },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async biddingStatus({ commit }, dates) {
      try {
        let res = await axios({
          method: "GET",
          url: "/statistics/statusCount",
          params: { startDate: dates.startDate, finishDate: dates.finishDate },
        });
        console.log(res);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async biddingContractor({ commit }, data) {
      try {
        let res = await axios({
          method: "GET",
          url: "/statistics/biddingByContractor",
          params: {
            startDate: data.startDate,
            finishDate: data.finishDate,
            contractor: data.contractor,
          },
        });
        console.log(res);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async biddingBudget({ commit }, data) {
      try {
        let res = await axios({
          method: "GET",
          url: "/statistics/budget",
          params: {
            startDate: data.startDate,
            finishDate: data.finishDate,
            budgetType: data.budget,
            botBudget: data.botBudget,
            topBudget: data.topBudget,
          },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteData({ commit, dispatch }, data) {
      try {
        let res = await axios({
          method: "POST",
          url: `/saveBidding/${data.dataType}/delete`,
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
          url: "/saveBidding/type",
        });

        let status = await axios({
          method: "GET",
          url: "/saveBidding/status",
        });

        let holidays = await axios({
          method: "GET",
          url: "/saveBidding/holiday",
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
          url: `/saveBidding/${data.dataType}/save`,
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
          params: {type: 'OBRAS'}
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
      contractor.Type = 'OBRAS'
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

    dayQuantity() {
      return Days.daysBetween(
        this.bidding.DocumentEntryDate,
        this.bidding.ContractDate
      );
    },
  },
  modules: {},
};
