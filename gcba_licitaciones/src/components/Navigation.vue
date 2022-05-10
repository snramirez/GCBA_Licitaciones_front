<template>
  <div>
    <v-app-bar clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-list-item :to="'/'">
        <v-app-bar-title>Licitaciones</v-app-bar-title>
      </v-list-item>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app >
      <v-list-item>
        <v-list-item-icon>
          <v-icon large @click.stop="drawer = !drawer">mdi-menu-open</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Menu</v-list-item-title>
      </v-list-item>
      
      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group v-model="group">

          <v-list-item 
            :to="'/addpliego'"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Generar Pliego
            </v-list-item-title>
          </v-list-item>

          <v-list-item 
            :to="'/listpliego'"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Lista Pliegos
            </v-list-item-title>
          </v-list-item>

          <v-list-item 
            :to="'/statistic'"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Estadisticas
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="'/login'"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Ingresar
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Setting
            </v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },

  methods:{
  },

  computed:{
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
</style>