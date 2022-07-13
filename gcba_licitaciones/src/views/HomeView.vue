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
    methods:{
      ...mapActions(['biddingType']),

      prueba(){
        let dates = {
          startDate: '2018-12-17T10:00:00.000Z',
          finishDate: '2020-12-27T10:00:00.000Z'
        }
        let res = this.biddingType(dates)
        console.log(res);
      }
    }
  }
</script>
