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
                  <v-col cols="3">
                    <v-select
                      v-model="filter.biddingType"
                      :items="types"
                      label="Filtrar por tipo Licitacion"
                    ></v-select>
                  </v-col>

                  <v-col cols="3">
                    <v-select
                      v-model="filter.biddingStatus"
                      :items="status"
                      label="Filtrar por Estado"
                    ></v-select>
                  </v-col>

                  <v-col cols="3">
                    <v-select
                      v-model="filter.ContractYear"
                      :items="year"
                      label="Filtrar por Año de contrato"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn @click="cleanFilter()">Limpiar Filtro</v-btn>
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
      filter: {
        biddingType: "",
        biddingStatus: "",
        ContractYear: 0,
      },
      year: [
      2015,
      2016,
      2017,
      2018,
      2019,
      2020,
      2021,
      2022,
      2023,
      ]

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

    cleanFilter(){
      this.filter = {
        biddingType: "",
        biddingStatus: "",
        ContractYear: 0,
      }
    }

  },
  computed:{
    ...mapState({
      types: (state) => state.bidding.types,
      status: (state) => state.bidding.status,
    }),

    itemFilter(){
      let filterItems = this.items
      let year = new Date(this.items[1].ContractDate).getFullYear()
      console.log('1',year)

      this.filter.biddingType === '' ?
        filterItems = filterItems :
        filterItems = filterItems.filter(item => item.BiddingType === this.filter.biddingType);

      console.log('2',filterItems)

      this.filter.biddingStatus === '' ?
        filterItems = filterItems :
        filterItems = filterItems.filter(item => item.Status === this.filter.biddingStatus);
        
      console.log('3',filterItems)

      this.filter.ContractYear === 0 ?
        filterItems = filterItems :
        filterItems = filterItems.filter(item => new Date(item.ContractDate).getFullYear() === this.filter.ContractYear);


      return filterItems
    }

  }
};
</script>

<style>
.v-expansion-panel-header{
  background: linear-gradient(to bottom,#3C3C3B 0,#878787 100%);
  color:white
}

.v-expansion-panel-content{
  background: #bbbbbb
}
</style>
