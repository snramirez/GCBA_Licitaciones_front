<template>
  <div>
    <Message />
    <v-form ref="form" lazy-validation @submit.prevent="validate">
      <PliegoInput :pliego ="pliego" />
    </v-form>
  </div>
</template>

<script>
import Message from "../components/Message.vue";
import PliegoInput from "../components/PliegoInput.vue";
export default {
  data() {
    return {
      pliego: {
        name: "",
        cuit: "",
        intern: "",
        post: 0,
        floor: 0,
        email: "",
        description: "",
        areas: "",
      },
    };
  },
  components: {
    Message,
    PliegoInput,
  },
  methods: {
    validate() {
      console.log('en vista',this.pliego);
      // this.$refs.form.validate();
    },
  },
};
</script>

<style>
</style>