<template>
  <div>
    <v-container>
      <v-tabs grow background-color="yellow accent-4" color="light-blue accent-3" show-arrows slider-size="5">
        <v-tab
          @click="contra = true; tipoLic = false; estadoLic = false;">
          Contratistas</v-tab>
        <v-tab
          @click="contra = false; tipoLic = true; estadoLic = false;"
          light>Tipo de Licitacion</v-tab>
        <v-tab
         @click="contra = false; tipoLic = false; estadoLic = true;">
          Estados de Licitacion</v-tab>
      </v-tabs>

     <ABMcru titulo='Contratistas' v-show="contra"/>
      <Tipocrud  label="Tipo de licitaciones" titulo="Tipo de Licitaciones" v-show="tipoLic"/>
      <Tipocrud  label="Estado de Licitaciones" titulo="Estado licitaciones" v-show="estadoLic"/>
   
    </v-container>

  </div>
</template>

<script>
import ABMcru from '../components/contratistaCRUDS.vue'
import CRUDContractor from '../components/CRUDContractor.vue'
import Tipocrud from '../components/Tipocrud.vue';


export default {
  data (){
    return{
      contra: true,
      tipoLic:false,
      estadoLic:false,

    }

  },

  components: {
    CRUDContractor,
    ABMcru,
    Tipocrud,
    
}
}
</script>

<style>
</style>