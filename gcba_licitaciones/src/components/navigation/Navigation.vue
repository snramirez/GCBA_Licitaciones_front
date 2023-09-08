<template>
  <div>
    <v-app-bar prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <a @click="redirectHome" class="pa-2">
        <v-img 
              contain
              max-height="150"
              max-width="250"
              src='../../assets/LogoBAL.png' 
              alt="Logo" 
              />
      </a>
      <v-spacer></v-spacer>
      <a @click="redirectHome" class="pa-5">
        <v-img 
              contain
              max-height="150"
              max-width="250"
              src='../../assets/LogoBA.png' 
              alt="Logo" 
              />
      </a>  
    </v-app-bar>

    <v-navigation-drawer dark v-model="drawer" app >
      <v-list-item>
        <v-list-item-icon>
          <v-icon large @click.stop="drawer = !drawer">mdi-menu-open</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Menu</v-list-item-title>
      </v-list-item>
      
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-subheader>Licitaciones Obras</v-subheader>
          <v-list-item 
            :to="'/addpliego'"
            v-if="authUser"

          >
            <v-list-item-icon>
              <v-icon>mdi-file-document-plus-outline</v-icon>
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
              <v-icon>mdi-format-list-bulleted</v-icon>
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
              <v-icon>mdi-chart-bar</v-icon>
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
              <v-icon>mdi-file-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Altas despegables
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>

        <v-divider></v-divider>

         <v-list-item-group>
          <v-subheader>Licitaciones Servicios</v-subheader>
          <v-list-item 
            :to="'/addpliegoservice'"
            v-if="authUser"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-document-plus-outline</v-icon>
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
              <v-icon>mdi-format-list-bulleted</v-icon>
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
              <v-icon>mdi-file-cog</v-icon>
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
        </v-list-item-group>
        
        <v-btn
            @click="logOut"
            class="ma-7"
            outlined
            color="#FFD500"
            v-if="authUser"
          >
            Cerrar Sesion
          </v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import router from '@/router';
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },

  methods:{
    ...mapActions('auth',['logOut']),
    redirectHome(){
      router.push('/')
    }
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
.v-app-bar{
  background: linear-gradient(to bottom,#ffd300 0,#ffbc00 100%)
}

.v-navigation-drawer{
  background: linear-gradient(to bottom,#878787 0,#3C3C3B 100%)
}

.logo-image {
  max-height: 48px; /* Ajusta el tamaño máximo de altura según tus necesidades */
  max-width: auto; /* La anchura se ajustará automáticamente según la proporción de la imagen */
  object-fit: contain;
}

</style>