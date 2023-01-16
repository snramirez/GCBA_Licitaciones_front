<template>
<v-container>

  <v-alert
      v-model="alert"
      border="top"
      color="red lighten-2"
      dark
      dismissible
      v-if="error.type !== null"
  >
    {{error.message}}
  </v-alert>

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="formAction"
  >
    <v-text-field
      v-model="user"
      :counter="20"
      :rules="userRules"
      label="Usuario"
      required
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="password"
      :counter="64"
      :rules="passwordRules"
      label="Contraseña"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      type="submit"
    >
      Ingresar
    </v-btn>
  </v-form>
</v-container>

</template>

<script>
import {mapActions, mapState} from "vuex"
 
export default {
  components:{
  },

  data() {
    return {
        user: "",
        password: "",
        valid: true,
        alert: true,
        userRules: [(v) => !!v || "El usuario es obligatorio"],
        passwordRules: [(v) => !!v || "La contraseña es obligatoria"],
    };
  },

  computed: {
    ...mapState(['error']),
  },

  methods:{
    async formAction(){
      await this.logIn({user: this.user.toLowerCase(), password: this.password})
      this.user = ''
      this.password = ''
    },
    ...mapActions(['logIn', 'cleanError'])
  },

  watch:{
    alert(oldAlert, newAlert){
      if(!this.alert){
        this.cleanError()
      }
    },
  },

  created(){
    this.cleanError()
  }

}
</script>

<style>

</style>