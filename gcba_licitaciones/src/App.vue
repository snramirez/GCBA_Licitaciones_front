<template>
  <v-app>
    <div class="appl">
      <Navigation/>
      <v-main>
        <router-view/>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { mapActions } from "vuex";

export default {
  name: 'App',
  components: {
    Navigation
  },
  methods: {
    ...mapActions(['getData', 'getContractor'])
  },
  data: () => ({
    //
  }),
  created(){
    this.getData()
    this.getContractor()
  }
};
</script>
