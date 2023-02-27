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
      :error-messages="userErrors"
      @input="v$.user.$touch()"
      @blur="v$.user.$touch()"

    ></v-text-field>
    <label v-if="v$.user.$error"></label>

    <v-text-field
      type="password"
      v-model="password"
      :counter="64"
      label="Contraseña"
      required
      :error-messages="passwordErrors"
      @input="v$.password.$touch()"
      @blur="v$.password.$touch()"
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="password2"
      :counter="64"
      label="Repita la contraseña"
      required
      :error-messages="password2Errors"
      @input="v$.password2.$touch()"
      @blur="v$.password2.$touch()"
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
      :error-messages="secretKeyErrors"
      @input="v$.secretKey.$touch()"
      @blur="v$.secretKey.$touch()"
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
import { required, minLength, sameAs } from '@vuelidate/validators'


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
        user: { required, minLength: minLength(5)},
        password: {required, minLength: minLength(5)},
        password2: {required, minLength: minLength(5), sameAsPassword: sameAs(this.password)},
        secretKey: {required}
      }
    },

    computed: {
        ...mapState(['error']),

        userErrors(){
          const errors = []
          if(!this.v$.user.$dirty) return errors
          this.v$.user.required.$invalid && errors.push('El usuario es obligatorio')
          this.v$.user.minLength.$invalid && errors.push('Minimo 5 caracteres')
          return errors
        },

        passwordErrors(){
          const errors = []
          if(!this.v$.password.$dirty) return errors
          this.v$.password.required.$invalid && errors.push('La contraseña es obligatoria')
          this.v$.password.minLength.$invalid && errors.push('Minimo 5 caracteres')
          return errors
        }, 

        password2Errors(){
          const errors = []
          if(!this.v$.password2.$dirty) return errors
          this.v$.password2.required.$invalid && errors.push('La contraseña es obligatoria')
          this.v$.password2.minLength.$invalid && errors.push('Minimo 5 caracteres')
          this.v$.password2.sameAsPassword.$invalid && errors.push('Las contraseñas no coinciden')
          return errors
        },

        secretKeyErrors(){
          const errors = []
          if(!this.v$.secretKey.$dirty) return errors
          this.v$.secretKey.required.$invalid && errors.push('secretKey es obligatoria')
          return errors
        }
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