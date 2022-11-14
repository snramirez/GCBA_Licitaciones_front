<template>
    <div>
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
                label="Revision Pliego Ingreso"
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
    </div>
</template>

<script>
export default{
    components: {
    },
    data(){
        return {
            menu: false,
            date: "2022-08-24T14:59:00.182Z",
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>