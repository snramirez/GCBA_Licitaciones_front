<template>
  <div>
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
    },

    methods:{
    }
  }
</script>
