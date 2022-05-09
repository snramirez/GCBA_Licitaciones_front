<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="menu = false"
      locale="es-AR"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
    data(){
        return {
            date: "",
            menu:false,
        }
    },
    props: {
        label: String
    },
    methods: {
      fecha(){
        this.$emit('dateChange', this.date)
      }
    },
    watch:{
      'date': function() {
        this.fecha()
      }
    }
};
</script>

<style>
</style>