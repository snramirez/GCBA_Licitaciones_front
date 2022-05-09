<template>
  <div>
    <Message />
    <v-form ref="form" lazy-validation @submit.prevent="validate">
      <PliegoInput :pliego ="bidding" />
    </v-form>
  </div>
</template>

<script>
import Message from "../components/Message.vue";
import PliegoInput from "../components/PliegoInput.vue";
export default {
  data() {
    return {
      bidding: {
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
        BidQuantity: "",
        PreAdjudgmentActDate: "",
        PreAdjudgmentActNumber: "",
        SecondPG: "",
        SecondLapPG: "",
        DayQuantity: "",
        ApproveNumber: "",
        ApproveDate: "",
        AllocatedBudget:  "",
        SPO: "",
        Contractor: "",
        ContractDate: "",
        ProcedureDays: "",
        Observations: ""
    }
    };
  },
  components: {
    Message,
    PliegoInput,
  },
  methods: {
    validate() {
      console.log('en vista',this.pliego);
      // this.$refs.form.validate();
    },
  },
};
</script>

<style>
</style>