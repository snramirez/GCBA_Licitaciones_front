<template>
  <div>
    <v-container>
      <v-form ref="form" @submit.prevent="validate">
        <v-row>
          <v-col cols="12" md="3">
            <v-select
              v-model="pickedContractor"
              :items="onlyNameContractor()"
              label="Contratista"
            ></v-select>
          </v-col>
  
          <v-col cols="12" md="3">
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
                  v-model="startDate"
                  label="Inicio Fecha de Contrato"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="checkbox"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                @input="menu = false"
                locale="es-AR"
              ></v-date-picker>
            </v-menu>
          </v-col>
  
          <v-col cols="12" md="3">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="finishDate"
                  label="Fin Fecha de Contrato"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="checkbox"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="finishDate"
                @input="menu2 = false"
                locale="es-AR"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
  
        <v-checkbox v-model="checkbox" label="Historico"></v-checkbox>

        <v-row>
          <v-col>
            <v-btn type="submit">Buscar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <PliegoTable
      :headers="pliegoHeaders"
      :items="pliegos"
      title="Licitaciones GCBA"
      accionName="Ver"
      @accion="viewOne"
      v-show="viewAll"
      />

      <ViewOne :bidding="onePliego" @close="changeView" v-show="!viewAll" />
    </v-container>
  </div>
</template>

<script>
import PliegoTable from "../components/PliegoTable.vue";
import ViewOne from "../components/ViewOne.vue";
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            status: "",
            startDate: "",
            finishDate: "",
            menu: false,
            menu2: false,
            checkbox: false,
            onePliego: {OfficialBudget: null, AllocatedBudget: null},
            pliegos:[],
            pickedContractor:"",
            viewAll: true,
            pliegoHeaders: [
                { text: "Nº Licitación", value: "BiddingNumber" },
                { text: "Expediente", value: "Record", width: "130px" },
                { text: "Expediente BAC OBRAS", value: "RecordBAC" },
                { text: "Obra", value: "Bidding", width: "300px" },
                { text: "Repartición", value: "Responsable" },
                { text: "Responsable", value: "Division" },
                { text: "Tipo Licitación", value: "BiddingType" },
                { text: "Presupuesto Oficial", value: "OfficialBudget" },
                { text: "Estado", value: "Status" },
                // {text:"Revisión Pliegos ingreso", value: "EntryDocumentReview"},
                // {text:"Revisión Pliegos egreso", value: "ExitDocumentReview"},
                // {text:"1ª Salida a PG", value: "FirstPG"},
                // {text:"1ª Vuelta de PG", value: "FirstLapPG"},
                { text: "Fecha Llamado", value: "CallDate", width: "200px" },
                { text: "Fecha Apertura de Ofertas", value: "BidOpeningDate" },
                // {text:"Cantidad de Ofertas", value: "BidQuantity"},
                // {text:"Fecha Acta Preadjudic.", value: "PreAdjudgmentActDate"},
                // {text:"Nº Acta Preadj.", value: "PreAdjudgmentActNumber"},
                // {text:"2º Salida a PG", value: "SecondPG"},
                // {text:"2ª vuelta de PG", value: "SecondLapPG"},
                // {text:"Cant. Días", value: "DayQuantity"},
                // {text:"N° Aprobatoria", value: "ApproveNumber"},
                // {text:"Fecha Aprobatoria", value: "ApproveDate"},
                // {text:"Monto Adjudicado", value: "AllocatedBudget"},
                // {text:"% S/P.O.", value: "SPO"},
                // {text:"Contratista", value: "Contractor"},
                {text:"Fecha Contrato", value: "ContractDate"},
                // {text:"Dias de trámite", value: "ProcedureDays"},
                // {text:"OBSERVACIONES", value: "Observations"},
                { text: "Accion", value: "actions", sortable: false },
            ],
        }
    },
    components:{
        PliegoTable,
        ViewOne
    },
    methods: {
    ...mapActions('bidding',['biddingContractor']),
    
    viewOne(pliego) {
      this.onePliego = pliego;
      this.viewAll = false;
    },

    changeView() {
      this.viewAll = !this.viewAll;
    },

    onlyNameContractor(){
      let contractorName = []
      this.contractor.forEach(element => contractorName.push(element.Name))
      return contractorName
    },

    async validate(){
        let query = {}
        query.contractor = this.pickedContractor
        if (this.checkbox) {
                query.startDate = new Date(1000, 1, 1)
                query.finishDate = new Date(3000, 1, 1)
        }
        else {
            query.startDate = this.startDate
            query.finishDate = this.finishDate
        }

        this.pliegos = await this.biddingContractor(query)
    }  
          
  },
  computed: {
    ...mapState({
      contractor: state => state.bidding.contractor
    })
  },
}

</script>

<style>

</style>