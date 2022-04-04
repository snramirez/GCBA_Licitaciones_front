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
export default {
  name: 'App',
  components: {
    Navigation
  },
  data: () => ({
    //
  }),
};
</script>
