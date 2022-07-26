<template>
  <div>
    <v-tabs background-color="#2764c4" tile dark grow>
          <v-tab  @click="budgetByStatus = true; assigned = false; closed = false;">Presupuesto Por Estado</v-tab>
          <v-tab  @click="assigned = true; budgetByStatus = false; closed = false;">Tomados</v-tab>
          <v-tab @click="closed = true; notAssigned = false; assigned=false;">Cerrados</v-tab>
    </v-tabs>

    <BudgetByStatus
    v-show="budgetByStatus"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BudgetByStatus from "../components/BudgetByStatus.vue";

export default {
  data() {
    return {
      budgetByStatus: true,

    };
  },
  components:{
    BudgetByStatus
  },
  methods: {
  },
  computed:{
  }
};
</script>

<style></style>
