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
    directContract: [],
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

    setBidding(state, pliego) {
      state.biddingService = pliego;
    },

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

    setPliego(state, payload) {
      state.pliegos = payload;
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

    setDirectContract(state, directContract) {
      state.directContract = directContract;
    },
  },

  actions: {
    loadEditPliego({ commit, state }, pliego) {
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

      pliego.CallDate
        ? (pliego.CallDate = pliego.CallDate.substring(0, 10))
        : "";

      pliego.BidOpeningDate
        ? (pliego.BidOpeningDate = pliego.BidOpeningDate.substring(0, 10))
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

      if(pliego.ExtensionData){
        pliego.ExtensionData.ExtensionDate
        ? (pliego.ExtensionData.ExtensionDate = pliego.ExtensionData.ExtensionDate.substring(0, 10))
        : "";
      }
      else{
        pliego.ExtensionData = {
          ExtensionCode: "",
          ExtensionDate: "",
          Budget: 0,
        }
      }

      pliego.ProrogationExpired
      ? (pliego.ProrogationExpired = pliego.ProrogationExpired.substring(0, 10))
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

    async setPliego({ commit, state }) {
      commit("contractorFromNameToId");
      try {
        let res = await axios.post("/biddingService/add", {
          bidding: state.biddingService,
        });
        console.log("🚀 ~ file: index.js ~ line 105 ~ setPliego ~ res", res);
      } catch (error) {
        console.log(error);
      }
      router.push("/");
    },

    async getPliegos({ commit }) {
      try {
        let pliegos = await axios({
          method: "get",
          url: "/biddingService",
        });
        commit("setPliego", pliegos.data);
        commit("cleanPliego");
      } catch (err) {
        console.log(err);
      }
    },

    async editPliego({ commit, state, dispatch }) {
      commit("contractorFromNameToId");
      console.log(state.biddingService)
      console.log(state.biddingService.ExtensionData)
      try {
        let res = await axios({
          method: "POST",
          url: "/biddingService/edit",
          data: {
            id: state.biddingService._id,
            data: state.biddingService,
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
          url: "/biddingService/delete",
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

        let directContract = await axios({
          method: "GET",
          url: "/saveBiddingService/directContract",
        });

        let holidays = await axios({
          method: "GET",
          url: "/saveBiddingService/holiday",
        });

        commit("setTypes", types.data);
        commit("setStatus", status.data);
        commit("setHolidays", holidays.data);
        commit("setDirectContract", directContract.data);
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
          params: { type: "SERVICIOS" },
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
      contractor.Type = "SERVICIOS";
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
