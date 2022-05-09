<template>
  <div>
    <Message />
    <v-form ref="form" lazy-validation @submit.prevent="validate">
      <PliegoInput />
    </v-form>
  </div>
</template>

<script>
import Message from "../components/Message.vue";
import PliegoInput from "../components/PliegoInput.vue";
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
    ...mapActions(['setPliego']),
    validate() {
      console.log('en vista', this.bidding);
      this.setPliego();
      // this.$refs.form.validate();
    },
  },
  computed:{
    ...mapState(['bidding'])
  }
};
</script>

<style>
</style>