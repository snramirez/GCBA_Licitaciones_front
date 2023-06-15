<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Busqueda"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="itemFilter"
      :search="search"
      item-key="_id"
      dense
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header> Filtros </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-container>
                
                <v-row>
                  <v-col cols="6">
                    <v-select
                      v-model="BiddingType"
                      :items="types"
                      label="Filtrar por tipo Licitacion"
                      required
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn>Aplicar Filtro</v-btn>
                    <v-btn>Limpiar Filtro</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>

      <template v-slot:item.CallDate="{ item }">
        <span>{{ formatDate2(item.CallDate) }}</span>
      </template>

      <template v-slot:item.BidOpeningDate="{ item }">
        <span>{{ formatDate2(item.BidOpeningDate) }}</span>
      </template>

      <template v-slot:item.ContractDate="{ item }">
        <span>{{ formatDate2(item.ContractDate) }}</span>
      </template>

      <template v-slot:item.OfficialBudget="{ item }">
        <span>{{ priceFormater(item.OfficialBudget) }}</span>
      </template>

      <template v-slot:item.AllocatedBudget="{ item }">
        <span>{{ priceFormater(item.AllocatedBudget) }}</span>
      </template>

      <!-- <template v-slot:expanded-item="{ headers, item }">            
          <td :colspan="headers.length">
            <v-card>
              <v-card-title>Descripcion</v-card-title>
              <v-card-text>
                {{ item.Description }}
              </v-card-text>
              <v-card-title v-if="item.FinishComment">Comentario de cierre</v-card-title>
              <v-card-text v-if="item.FinishComment">
                {{ item.FinishComment }}
              </v-card-text>
            </v-card>
          </td>
      </template> -->

      <template v-slot:item.actions="{ item }">
        <v-btn-toggle>
          <v-btn
            justify="space-around"
            color="#29BDEF"
            small
            @click="accion(item)"
            ><v-icon>mdi-eye-arrow-right-outline</v-icon></v-btn
          >

          <v-btn
            justify="space-around"
            color="#FFD500"
            small
            @click="accion2(item)"
            ><v-icon> mdi-clipboard-edit-outline</v-icon></v-btn
          >

          <v-btn
            justify="space-around"
            color="#EC607E"
            small
            @click="accion3(item)"
            ><v-icon> mdi-delete</v-icon></v-btn
          >
        </v-btn-toggle>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
const moment = require("moment");
import "moment/locale/es";
moment.locale("es");
import { mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      BiddingType: "",

    };
  },
  props: {
    title: String,
    items: Array,
    headers: Array,
    accionName: String,
  },
  methods: {
    accion(item) {
      this.$emit("accion", item);
    },

    accion2(item) {
      this.$emit("accion2", item);
    },

    accion3(item) {
      this.$emit("accion3", item);
    },

    formatDate(date) {
      if (!date) return;
      return moment.utc(date).format("LL");
    },

    formatDate2(date) {
      if (!date) return;
      return moment.utc(date).format("L");
    },

    priceFormater(num) {
      const formatter = new Intl.NumberFormat("es-AR");
      return formatter.format(num);
    },

  },
  computed:{
    ...mapState({
      types: (state) => state.bidding.types,
    }),

    itemFilter(){
      if(this.BiddingType === '')
        return this.items
      else
        return this.items.filter(item => item.BiddingType === this.BiddingType)
    }

  }
};
</script>

<style></style>
