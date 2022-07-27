<template>
  <div>
    <v-tabs grow background-color="yellow accent-4" color="light-blue accent-3" show-arrows slider-size="5">
          <v-tab  @click="budgetByStatus = true; biddingType = false; closed = false;">Presupuesto Por Estado</v-tab>
          <v-tab  @click="biddingType = true; budgetByStatus = false; closed = false;" light>Tipos de Licitacion</v-tab>
          <v-tab @click="closed = true; notAssigned = false; assigned=false;">Cerrados</v-tab>
    </v-tabs>

    <BudgetByStatus
    v-show="budgetByStatus"/>

    <BiddingType v-show="biddingType"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BudgetByStatus from "../components/BudgetByStatus.vue";
import BiddingType from "../components/BiddingType.vue";

export default {
  data() {
    return {
      budgetByStatus: true,
      biddingType: false,
    };
  },
  components:{
    BudgetByStatus,
    BiddingType,
},
  methods: {
  },
  computed:{
  }
};
</script>

<style></style>
