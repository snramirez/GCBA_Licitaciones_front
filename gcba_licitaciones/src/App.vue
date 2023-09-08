<template>
  <v-app>
    <div class="appl">
      <header class="nav">
        <Navigation/>
      </header>
      <v-main>
        <router-view/>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Navigation from "./components/navigation/Navigation.vue";
import { mapActions } from "vuex";

export default {
  name: 'App',
  components: {
    Navigation
  },
  methods: {
    ...mapActions({
      getData: 'bidding/getData',
      getContractor: 'bidding/getContractor',
      getDataService: 'biddingService/getData',
      getContractorService: 'biddingService/getContractor',
    }),
  },
  data: () => ({
    //
  }),
  created(){
    this.getData()
    this.getDataService()
    this.getContractor()
    this.getContractorService()
  }
};
</script>
