<template>
  <!--tipo de licitaciones-->
  <v-container>
    <h1>{{ titulo }}</h1>
    <v-row>
      <v-col>
        <v-form>
          <v-row v-for="item in data" :key="item">
            <v-text-field
              cols="4"
              class="ms-4"
              :value="item"
              :label="label"
              filled
              dense
            >
              <template slot="append-outer">
                <v-btn
                  color="error"
                  @click="deleteData({ data: item, dataType: dataType })"
                  >Borrar</v-btn
                >
              </template>
            </v-text-field>
          </v-row>
        </v-form>
        <!-- boton agregar -->
        <v-btn class="mx-2" fab dark color="indigo" @click="muestro">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-form
              @submit="
                saveData({ data: newType, dataType: dataType });
                dialog = !dialog;
              "
              onSubmit="return false;"
            >
              <v-text-field
                :label="label"
                filled
                dense
                v-model="newType"
              ></v-text-field>
              <v-btn type="submit" color="success" class="pa-2">Agregar</v-btn>
            </v-form>
          </v-card>
        </v-dialog>

        <!--cierra boton agregar-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      newType: "",
    };
  },
  props: {
    titulo: String,
    label: String,
    data: Array,
    dataType: String,
  },
  methods: {
    saveData(data) {
      this.$emit("send", data);
    },

    deleteData(data) {
      this.$emit("erase", data);
    },

    muestro() {
      this.newType = "";
      this.dialog = !this.dialog;
    },
  },
};
</script>
