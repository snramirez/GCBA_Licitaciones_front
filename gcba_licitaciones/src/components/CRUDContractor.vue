<template>
  <div>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="items"
            hide-default-header
            hide-default-footer
            class="elevation-1"
        ></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
    data(){
        return {
            items: [
                {name: "SALVATORI SA PARQUES Y JARDINES"},
                {name: "INGECONS SA"},
                {name: "INSTALECTRO SA"},
                {name:  "CLEANOSOL ARGENTINA SAICFI"},
                {name: "ROL INGENIERIA SA"},
                {name: "NAKU CONSTRUCCIONES SRL"},
            ],
            headers: [
                { text: "Nombre", value: "name" },
            ],
        }
    }
}
</script>

<style>

</style>