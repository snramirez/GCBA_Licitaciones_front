<template>
  <div>
    <v-container>
      <v-tabs
        grow
        background-color="yellow accent-4"
        color="light-blue accent-3"
        show-arrows
        slider-size="5"
      >
        <v-tab
          @click="
            contra = true;
            tipoLic = false;
            estadoLic = false;
            holiday = false;
          "
          >Contratistas</v-tab
        >
        <v-tab
          @click="
            contra = false;
            tipoLic = true;
            estadoLic = false;
            holiday = false;
          "
          >Tipo de Licitacion</v-tab
        >
        <v-tab
          @click="
            contra = false;
            tipoLic = false;
            estadoLic = true;
            holiday = false;
          "
          >Estados de Licitacion</v-tab
        >
        <v-tab
          @click="
            contra = false;
            tipoLic = false;
            estadoLic = false;
            holiday = true;
          "
          >Feriados</v-tab
        >
      </v-tabs>

      <ABMcru
        titulo="Contratistas"
        v-show="contra"
        :data="contractor"
        @sendContractor="sendContractor"
        @modifyContractor="modifyContractor"
        @eraseContractor="eraseContractor"
      />

      <Tipocrud
        label="Tipo de licitaciones"
        titulo="Tipo de Licitaciones"
        v-show="tipoLic"
        :data="types"
        dataType="type"
        @send="sendData"
        @erase="eraseData"
      />

      <Tipocrud
        label="Estados de licitaciones"
        titulo="Estado de Licitacion"
        v-show="estadoLic"
        :data="status"
        dataType="status"
        @send="sendData"
        @erase="eraseData"
      />

      <AddHoliday
        label="Feriados"
        titulo="Feriados"
        v-show="holiday"
        :data="holidays"
        dataType="holiday"
      />
    </v-container>
  </div>
</template>

<script>
import ABMcru from "../components/contratistaCRUDS.vue";
import Tipocrud from "../components/Tipocrud.vue";
import AddHoliday from "../components/AddHoliday.vue";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      contra: true,
      tipoLic: false,
      estadoLic: false,
      holiday: false,
    };
  },

  computed: {
    ...mapState({
      types: (state) => state.biddingService.types,
      status: (state) => state.biddingService.status,
      contractor: (state) => state.biddingService.contractor,
      holidays: (state) => state.biddingService.holidays,
    }),
  },

  components: {
    ABMcru,
    Tipocrud,
    AddHoliday,
  },

  methods: {
    ...mapActions("biddingService", [
      "saveData",
      "deleteData",
      "deleteContractor",
      "saveContractor",
      "editContractor",
    ]),

    sendData(data) {
      this.saveData(data);
    },

    eraseData(data) {
      this.deleteData(data);
    },

    sendContractor(data) {
      this.saveContractor(data);
    },

    modifyContractor(data) {
      this.editContractor(data);
    },

    eraseContractor(data) {
      this.deleteContractor(data);
    },
  },
};
</script>

<style></style>
