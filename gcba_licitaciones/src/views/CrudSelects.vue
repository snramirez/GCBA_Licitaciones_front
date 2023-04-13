<template>
  <div>
    <v-container>
      <v-tabs grow background-color="yellow accent-4" color="light-blue accent-3" show-arrows slider-size="5">
        <v-tab @click="contra = true; tipoLic = false; estadoLic = false; holiday = false;">Contratistas</v-tab>
        <v-tab @click="contra = false; tipoLic = true; estadoLic = false; holiday = false;" light>Tipo de
          Licitacion</v-tab>
        <v-tab @click="contra = false; tipoLic = false; estadoLic = true; holiday = false;">Estados de
          Licitacion</v-tab>
        <v-tab @click="contra = false; tipoLic = false; estadoLic = false; holiday = true;">Feriados</v-tab>
      </v-tabs>

      <ABMcru titulo='Contratistas' v-show="contra" :data="contractor" />

      <Tipocrud label="Tipo de licitaciones" titulo="Tipo de Licitaciones" v-show="tipoLic" :data="types"
        dataType="type" />

      <Tipocrud label="Estados de licitaciones" titulo="Estado de Licitacion" v-show="estadoLic" :data="status"
        dataType="status" />

      <AddHoliday label="Feriados" titulo="Feriados" v-show="holiday" :data="holidays" dataType="holiday" />


    </v-container>

  </div>
</template>

<script>
import ABMcru from '../components/contratistaCRUDS.vue'
import Tipocrud from '../components/Tipocrud.vue';
import AddHoliday from "../components/AddHoliday.vue";
import { mapState } from 'vuex';


export default {
  data() {
    return {
      contra: true,
      tipoLic: false,
      estadoLic: false,
      holiday: false
    }

  },

  computed: {
    ...mapState({
      types: state => state.bidding.types,
      status: state => state.bidding.status,
      contractor: state => state.bidding.contractor,
      holidays: state => state.bidding.holidays,
    })
  },

  components: {
    ABMcru,
    Tipocrud,
    AddHoliday
  }
}
</script>

<style>

</style>