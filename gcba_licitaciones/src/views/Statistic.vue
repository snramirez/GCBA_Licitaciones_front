<template>
  <div>
    <v-tabs dark grow background-color="#3C3C3B" color="#FFD500" show-arrows slider-size="5">
          <v-tab  @click="budgetByStatus = true; biddingType = false; biddingStatus = false; biddingContractor = false; biddingBudget = false">Presupuesto Por Estado</v-tab>
          <v-tab  @click="biddingType = true; budgetByStatus = false; biddingStatus = false; biddingContractor = false; biddingBudget = false" light>Tipos de Licitacion</v-tab>
          <v-tab @click="biddingStatus = true; budgetByStatus = false; biddingType=false; biddingContractor = false; biddingBudget = false">Licitaciones por Estado</v-tab>
          <v-tab @click="biddingContractor = true; budgetByStatus = false; biddingType=false; biddingStatus = false; biddingBudget = false">Licitaciones por Contratista</v-tab>
          <v-tab @click="biddingBudget = true; budgetByStatus = false; biddingType=false; biddingStatus = false; biddingContractor = false">Licitaciones por Presupuestos</v-tab>
    </v-tabs>

    <BudgetByStatus v-show="budgetByStatus"/>
    <BiddingType v-show="biddingType"/>
    <BiddingStatus v-show="biddingStatus"/>
    <BiddingByContractor v-show="biddingContractor"/>
    <BiddingBudget v-show="biddingBudget"/>


  </div>
</template>

<script>
import BudgetByStatus from "../components/statistic/BudgetByStatus.vue";
import BiddingType from "../components/statistic/BiddingType.vue";
import BiddingStatus from '../components/statistic/BiddingStatus.vue'
import BiddingByContractor from '../components/statistic/BiddingByContractor.vue'
import BiddingBudget from '../components/statistic/BiddingBudget.vue'

export default {
  data() {
    return {
      budgetByStatus: true,
      biddingType: false,
      biddingStatus: false,
      biddingContractor: false,
      biddingBudget: false
    };
  },
  components:{
    BudgetByStatus,
    BiddingType,
    BiddingStatus,
    BiddingByContractor,
    BiddingBudget
},
  methods: {
  },
  computed:{
  }
};
</script>

<style></style>
