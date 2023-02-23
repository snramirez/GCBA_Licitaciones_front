<template>
  <v-container>

  <v-alert
      border="top"
      color="red lighten-2"
      dark
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
      label="Usuario"
      required
    ></v-text-field>
    <label v-if="v$.user.$error"></label>

    <v-text-field
      type="password"
      v-model="password"
      :counter="64"
      label="Contraseña"
      required
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="password2"
      :counter="64"
      label="Repita la contraseña"
      required
    ></v-text-field>

     <v-text-field
        type="text"
        v-model="fullName"
        :counter="30"
        label="Nombre completo"
        required
    ></v-text-field>

    <v-text-field
        v-model="cuit"
        :counter="11"
        label="Cuit sin espacios ni guion"
        required
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="secretKey"
      :counter="30"
      label="Clave secreta"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      type="submit"
    >
      Registrar
    </v-btn>
  </v-form>
</v-container>
</template>

<script>
import { mapActions, mapState } from "vuex"
import { reactive } from '@vue/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'


export default {
    setup(){
      return{
        v$: useVuelidate()
      }
    },

    data() {
        return {
            user: "",
            password: "",
            password2: "",
            secretKey: "",
            fullName: "",
            cuit: "",
            valid: true,
            // userRules: [(v) => !!v || "El usuario es obligatorio"],
            // cuitRules: [(v) => !!v || "El cuit es obligatorio"],
            // nameRules: [
            //     (v) => !!v || "El nombre es obligatorio",
            //     (v) => v.length <= 30 || "El nombre tiene que ser menor a 30 caracteres"],
            // keyRules: [(v) => !!v || "La clave es obligatoria"],
            // passwordRules: [(v) => !!v || "La contraseña es obligatoria"],
        };
    },

    validations () {
      return {
        user: { required},

      }
    },

    computed: {
        ...mapState(['error'])
    },

    methods:{
        ...mapActions(['register']),

        async formAction(){
          let error = await this.v$.$validate()
          console.log(error)
            await this.register({
                user: this.user.toLowerCase(),
                password: this.password,
                cuit: this.cuit,
                fullName: this.fullName,
                secretKey: this.secretKey
            })
        },
    }
}
</script>

<style>

</style>