<template>
  <div>
    <v-container class="pa-7">
      <v-form ref="form" @submit.prevent="validate">
        <v-row>
          <v-col cols="12" md="3">
            <v-select
              v-model="budget"
              :items="budgets"
              label="Tipo de Presupuesto"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="budget==='Presupuesto Oficial'">
            Fecha de Llamado entre:
          </v-col>
          <v-col v-if="budget==='Monto Adjudicado'">
            Fecha de Contrato entre: 
          </v-col>
        </v-row>  

        <v-row>
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
                  label="Fecha de Inicio"
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
                  label="Fecha de Fin"
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

          <v-col cols="12" md="3">
            <v-checkbox v-model="checkbox" label="Historico"></v-checkbox>
          </v-col>
        </v-row>
        

        <v-row>
            <v-col cols="12">
                Presupuesto Entre:
            </v-col>
            <v-col cols="12" md="3">
              <v-currency-field v-model="botBudget" label="Minimo"></v-currency-field>  
            </v-col>
            <v-col cols="12" md="3">
              <v-currency-field v-model="topBudget" label="Maximo"></v-currency-field>  
            </v-col>
        </v-row>


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
        v-show="viewList"
        :headers="pliegoHeaders"
        :items="pliegos"
        title="Licitaciones GCBA"
        accionName="Ver"
        @accion="viewOne"
        @accion2="edit"
        @accion3="showDeleteWarning"
      />

      <PliegoInput
        v-show="viewEdit"
        @close="closeView"
        :showBackBtn="true"
        btnName="Editar"
        @accion="editPliego()"
      />

      <CompleteFieldView
        v-show="viewEvery"
        :bidding="onePliego"
        @close="closeView"
        :contractor="contractor"
        :holidays="holidays"
      />

      <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-form
          @submit="
            deleteBidding();
            dialog = !dialog;
          "
          onSubmit="return false;"
        >
          <div class="text-h3 pa-12" center>
            ¿Esta seguro de que quiere eliminar el pliego?
          </div>
          <v-btn type="submit" color="success" class="pa-2" center
            >Eliminar</v-btn
          >
        </v-form>
      </v-card>
    </v-dialog>
    </v-container>
  </div>
</template>

<script>
import PliegoTable from "../PliegoTable.vue";
import CompleteFieldView from "../CompleteFieldView.vue";
import PliegoInput from "../building/PliegoInput.vue";
import { mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      status: "",
      startDate: "",
      finishDate: "",
      botBudget: 0,
      topBudget: 0,
      menu: false,
      menu2: false,
      checkbox: false,
      budgets: [
        "Presupuesto Oficial",
        "Monto Adjudicado",
      ],
      onePliego: {OfficialBudget: null, AllocatedBudget: null},
      pliegos: [],
      viewList: true,
      viewEdit: false,
      viewEvery: false,
      idDelete: "",
      dialog: false,
      budget: "",
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
        { text:"Monto Adjudicado", value: "AllocatedBudget"},
        { text: "Estado", value: "Status" },
        // {text:"Revisión Pliegos ingreso", value: "EntryDocumentReview"},
        // {text:"Revisión Pliegos egreso", value: "ExitDocumentReview"},
        // {text:"1ª Salida a PG", value: "FirstPG"},
        // {text:"1ª Vuelta de PG", value: "FirstLapPG"},
        { text: "Fecha Llamado", value: "CallDate" },
        { text: "Fecha Apertura de Ofertas", value: "BidOpeningDate" },
        // {text:"Cantidad de Ofertas", value: "BidQuantity"},
        // {text:"Fecha Acta Preadjudic.", value: "PreAdjudgmentActDate"},
        // {text:"Nº Acta Preadj.", value: "PreAdjudgmentActNumber"},
        // {text:"2º Salida a PG", value: "SecondPG"},
        // {text:"2ª vuelta de PG", value: "SecondLapPG"},
        // {text:"Cant. Días", value: "DayQuantity"},
        // {text:"N° Aprobatoria", value: "ApproveNumber"},
        // {text:"Fecha Aprobatoria", value: "ApproveDate"},
        // {text:"% S/P.O.", value: "SPO"},
        // {text:"Contratista", value: "Contractor"},
        { text: "Fecha Contrato", value: "ContractDate" },
        // {text:"Dias de trámite", value: "ProcedureDays"},
        // {text:"OBSERVACIONES", value: "Observations"},
        { text: "Accion", value: "actions", sortable: false },
      ],
    };
  },
  components: {
    PliegoTable,
    PliegoInput,
    CompleteFieldView,
  },
  methods: {
    ...mapActions('bidding',[
      "biddingBudget",
      "loadEditPliego",
      "editPliego",
      "deletePliego"
    ]),

    viewOne(pliego) {
      this.onePliego = pliego;
      this.viewList = false;
      this.viewEvery = true;
      this.viewEdit = false;
    },

    edit(pliego) {
      this.loadEditPliego(pliego);
      this.viewEdit = true;
      this.viewEvery = false;
      this.viewList = false;
    },

    showDeleteWarning(pliego) {
      this.dialog = !this.dialog;
      this.idDelete = pliego._id;
    },

    deleteBidding() {
      this.deletePliego(this.idDelete);
    },

    closeView() {
      this.viewEvery = false;
      this.viewList = true;
      this.viewEdit = false;
    },

    async validate() {
      let query = {};
      query.budget = this.budget === "Presupuesto Oficial" ? "OfficialBudget" : "AllocatedBudget";
      query.botBudget = this.botBudget
      query.topBudget = this.topBudget

      if (this.checkbox) {
        query.startDate = new Date(1000, 1, 1);
        query.finishDate = new Date(3000, 1, 1);
      } else {
        query.startDate = this.startDate;
        query.finishDate = this.finishDate;
      }

      this.pliegos = await this.biddingBudget(query);
    },
  },
  
  computed: {
    ...mapState({
      contractor: state => state.bidding.contractor,
      holidays: (state) => state.bidding.holidays,
    })
  }
};
</script>

<style></style>
