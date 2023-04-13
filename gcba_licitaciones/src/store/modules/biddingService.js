import axios from 'axios'
import Days from '../../Helpers/Days'
import router from '../../router/index'
axios.defaults.baseURL = 'http://localhost:8082/api'

export default {
    namespaced: true,
    state: {
        types: [],
        status:[],
        holidays: [],
        contractor: [],
        biddingService:{
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
            Budget: 0
          },
          Prorogation: false,
          ProrogationExpired: "",
          ProcedureDays: "",
          Observations: ""
        },
        pliegos:[],
      },
}