<template>
    <V-container class="pa-7">
      <!--Primera targeta-->
      <v-row justify="center">
        <v-col>
          <h1 text-center>Licitaciones</h1>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col align-self="end">
          <v-btn @click="close()" color="orange darken-1">
            <v-icon dark left> mdi-arrow-left </v-icon>
            Volver
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>Nº Licitación:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.BiddingNumber }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content>Expediente:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.Record }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content>Expediente BAC OBRAS:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.RecordBAC }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content>Obra:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.Bidding }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content>Repartición:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.Division }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content>Responsable:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.Responsable }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content>Tipo Licitación:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.BiddingType }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Presupuesto Oficial:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{priceFormater(bidding.OfficialBudget)}}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Estado:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.Status }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Ingreso de Expediente:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.DocumentEntryDate) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Revisión Pliegos ingreso:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.EntryDocumentReview) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Revisión Pliegos egreso:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.ExitDocumentReview) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> 1ª Salida a PG:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.FirstPG) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> 1ª Vuelta de PG:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.FirstLapPG) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Fecha Llamado:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.CallDate) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Fecha Apertura de Ofertas:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.BidOpeningDate) }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
  
        <!-- segunda targeta-->
  
        <v-col cols="12" md="6">
          <v-card>
            <v-list dense>
              <v-list-item>
                <v-list-item-content class="align-end">
                  <v-data-table
                    :headers="headers"
                    :items="offerDataTable()"
                    :item-class="itemRowBackground"
                    hide-default-header
                    hide-default-footer
                    disable-pagination
                    class="elevation-1"
                  >

                  <template v-slot:item.Quantity="{ item }">
                    <span>{{ priceFormater(item.Quantity) }}</span>
                  </template>

                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Ofertas</v-toolbar-title>
                    </v-toolbar>
                  </template>

                </v-data-table>
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Fecha Acta Preadjudic.:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.PreAdjudgmentActDate) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content>Nº Acta Preadj.:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.PreAdjudgmentActNumber }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> 2º Salida a PG:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.SecondPG) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> 2ª vuelta de PG:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.SecondLapPG) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> N° Aprobatoria:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.ApproveNumber }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Fecha Aprobatoria:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.ApproveDate) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> Monto Adjudicado:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{priceFormater(bidding.AllocatedBudget)}}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> % S/P.O.:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{((Math.fround(bidding.AllocatedBudget / bidding.OfficialBudget) - 1) * 100).toFixed(3)}}%
                </v-list-item-content>
              </v-list-item>
      
  
              <v-list-item>
                <v-list-item-content> Fecha Contrato:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ formatDate2(bidding.ContractDate) }}
                </v-list-item-content>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-content> OBSERVACIONES:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ bidding.Observations }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </V-container>
  </template>
  <script>
  const moment = require("moment");
  import "moment/locale/es";
  moment.locale("es");
  import { mapState } from "vuex";
  import Days from '../Helpers/Days'
  
  export default {
    props: {
      bidding: Object,
      contractor: Array,
      holidays: Array
    },
    components: {
    },
    data() {
      return {
        headers: [
          { text: "razon social", value: "Contractor" },
          { text: "Offer", value: "Quantity" },
          { text: "Diferencia %", value: "Porcentage" },
        ],
      };
    },
    methods: {
      close() {
        this.$emit("close");
      },
  
      formatDate2(date) {
        if (!date) return;
        return moment.utc(date).format('L');
      },
  
      offerDataTable() {
        let data = [];
        if(this.bidding.BidQuantity){
          this.bidding.BidQuantity.forEach((element) => {
            let nameContractors = "";
            element.Contractor.forEach((item) => {
              nameContractors = 
                nameContractors.concat(this.getNameContractor(item), " - ");
            });

            data.push({
              _id: element.Contractor,
              Contractor: nameContractors,
              Quantity: element.Quantity,
              Winner: element.Winner,
              Porcentage: Math.round(((element.Quantity / this.bidding.OfficialBudget - 1) * 100)) + "%",
            });
          });
        }
        return data;
      },
  
      getNameContractor(id) {
        let nameContractor = "";
        this.contractor.forEach((contractor) =>
          contractor._id === id ? (nameContractor = contractor.Name) : 0
        );
        return nameContractor;
      },
  
      priceFormater(num){
        const formatter = new Intl.NumberFormat('es-AR')
        // , {
        //       style: 'currency',
        //       currency: 'ARS'
        //     })
        return formatter.format(num)
      },
  
      getNameContractor(id){
          let nameContractor = ''
          this.contractor.forEach(contractor => contractor._id === id ? nameContractor = contractor.Name : 0)
          return nameContractor
        },

      itemRowBackground(item) {
        return item.Winner ? "style-1" : "";
    },
    },
  
    computed: {
      dayQuantity(){
        return Days.daysBetween(this.bidding.DocumentEntryDate, this.bidding.ContractDate, this.holidays)
      }
    },
  };
  </script>
  
<style>
  .style-1 {
    background-color: #FFD500 ;
  }
  .style-2 {
    background-color: rgb(114, 114, 67);
  }
</style>