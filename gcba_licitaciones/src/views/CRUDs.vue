<template>
  <div>
    <v-container>
        <v-tabs grow background-color="yellow accent-4" color="light-blue accent-3" show-arrows slider-size="5">
          <v-tab  @click="budgetByStatus = true; biddingType = false; biddingStatus = false; biddingContractor = false; biddingBudget = false">Contratistas</v-tab>
          <v-tab  @click="biddingType = true; budgetByStatus = false; biddingStatus = false; biddingContractor = false; biddingBudget = false" light>Tipo de Licitacionn</v-tab>
          <v-tab @click="biddingStatus = true; budgetByStatus = false; biddingType=false; biddingContractor = false; biddingBudget = false">Estados  de Licitacion</v-tab>
    </v-tabs>

    <CRUDContractor/>
    </v-container>

  </div>
</template>

<script>
import CRUDContractor from '../components/CRUDContractor.vue'

export default {
    components:{
        CRUDContractor
    }
}
</script>

<style>

</style>