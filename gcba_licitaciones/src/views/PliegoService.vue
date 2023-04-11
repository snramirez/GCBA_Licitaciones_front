<template>
    <div>
      <Message />
      <v-form ref="form">
        <PliegoInputService btnName="Enviar" @accion="setPliego"/>
      </v-form>
    </div>
  </template>
  
  <script>
  import Message from "../components/Message.vue";
  import PliegoInputService from "../components/PliegoInputService.vue";
  import { mapState, mapActions } from "vuex";
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
      ...mapActions(['setPliego']),
    },
    computed:{
      ...mapState(['bidding'])
    },
    created(){
    }
  };
  </script>
  
  <style>
  </style>