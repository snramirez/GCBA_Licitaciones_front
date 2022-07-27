<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-default-header
    hide-default-footer
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
    props:{
        items: Array,
        headers: Array
    }

}
</script>

<style>

</style>