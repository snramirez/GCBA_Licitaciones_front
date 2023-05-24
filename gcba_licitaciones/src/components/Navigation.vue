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

      <v-list nav dense>
        <v-list-item-group v-model="group">

          <v-list-item 
            :to="'/addpliego'"
            v-if="authUser"

          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title >
              Generar Proceso Licitatorio
            </v-list-item-title>
          </v-list-item>

          <v-list-item 
            :to="'/listpliego'"
            v-if="authUser"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Lista de Licitaciones
            </v-list-item-title>
          </v-list-item>

          <v-list-item 
            :to="'/statistic'"
            v-if="authUser"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Estadisticas
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="'/crudselects'"
            v-if="authUser"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Altas despegables
            </v-list-item-title>
          </v-list-item>

          <v-list-item 
            :to="'/addpliegoservice'"
            v-if="authUser"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Generar Pliego Servicios
            </v-list-item-title>
          </v-list-item>

          <v-list-item 
            :to="'/listservice'"
            v-if="authUser"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Lista Pliegos Servicios
            </v-list-item-title>
          </v-list-item>

          <v-list-item 
            :to="'/crudselectService'"
            v-if="authUser"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Altas Servicios
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="!authUser"
            :to="'/login'"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Ingresar
            </v-list-item-title>
          </v-list-item>

          <v-btn
            @click="logOut"
            class="ma-2"
            outlined
            color="indigo"
            v-if="authUser"
          >
            Cerrar Sesion
          </v-btn>


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
    ...mapActions('auth',['logOut'])
  },

  computed:{
    ...mapGetters('auth',['authUser'])
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