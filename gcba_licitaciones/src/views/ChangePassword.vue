<template>
    <v-container>

        <v-alert v-model="alert" border="top" color="red lighten-2" dark dismissible v-if="error.type !== null">
            {{ error.message }}
        </v-alert>

        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="formAction">

            <v-text-field type="password" v-model="password" :counter="64" :rules="passwordRules" label="Contraseña"
                required></v-text-field>

            <v-text-field type="password" v-model="confirmPassword" :counter="64" :rules="passwordRules" label="Repita la Contraseña"
                required></v-text-field>

            <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
                Ingresar
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            password: '',
            confirmPassword: '',
            passwordRules: [
                (v) => !!v || "La contraseña es obligatoria",
                (v) => 
            ],
        }
    },

    computed:{

    }
}
</script>

<style>

</style>