<template>
  <div>
    <v-tabs grow background-color="yellow accent-4" color="light-blue accent-3" show-arrows slider-size="5">
          <v-tab  @click="budgetByStatus = true; biddingType = false; biddingStatus = false;">Presupuesto Por Estado</v-tab>
          <v-tab  @click="biddingType = true; budgetByStatus = false; biddingStatus = false;" light>Tipos de Licitacion</v-tab>
          <v-tab @click="biddingStatus = true; budgetByStatus = false; biddingType=false;">Licitaciones por Estado</v-tab>
    </v-tabs>

    <BudgetByStatus v-show="budgetByStatus"/>
    <BiddingType v-show="biddingType"/>
    <BiddingStatus v-show="biddingStatus"/>

  </div>
</template>

<script>
import BudgetByStatus from "../components/BudgetByStatus.vue";
import BiddingType from "../components/BiddingType.vue";
import BiddingStatus from '../components/BiddingStatus.vue'

export default {
  data() {
    return {
      budgetByStatus: true,
      biddingType: false,
      biddingStatus: false
    };
  },
  components:{
    BudgetByStatus,
    BiddingType,
    BiddingStatus,
},
  methods: {
  },
  computed:{
  }
};
</script>

<style></style>
