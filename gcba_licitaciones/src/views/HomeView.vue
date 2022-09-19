<template>
  <div>
    <v-btn @click="prueba">Boton para prueba</v-btn>
    <hello-world />
  </div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'
  import { mapState, mapActions } from "vuex";
  export default { 
    name: 'Home',

    components: {
      HelloWorld,
    },

    computed:{
      ...mapState(['types'])
    },

    methods:{
      ...mapActions(['getContractor']),

      async prueba(){
        let res = await this.getContractor()
        console.log(this.contractor, 'en vista');
      }
    }
  }
</script>
