<template>
    <div>
      <Message />
      <v-form ref="form">
        <PliegoInputService btnName="Enviar" @accion="setPliego"/>
      </v-form>
    </div>
  </template>
  
  <script>
  import Message from "../components/extras/Message.vue";
  import PliegoInputService from "../components/service/PliegoInputServiceCambios.vue";
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
      };
    },
    components: {
      Message,
      PliegoInputService,
    },
    methods: {
      ...mapActions('biddingService',['setPliego']),
    },
    created(){
    }
  };
  </script>
  
  <style>
  </style>