<template>
  <div>
    <Message />
    <v-form ref="form">
      <PliegoInput btnName="Enviar" @accion="setPliego"/>
    </v-form>
  </div>
</template>

<script>
import Message from "../components/extras/Message.vue";
import PliegoInput from "../components/building/PliegoInput.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
    };
  },
  components: {
    Message,
    PliegoInput,
  },
  methods: {
    ...mapActions('bidding', ['setPliego']),
  },
  computed:{
    ...mapState({
      bidding: state => state.bidding.bidding
    })
  },
  created(){
  }
};
</script>

<style>
</style>