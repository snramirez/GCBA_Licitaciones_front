<template>
  <div>
    <PliegoTable
      :headers="pliegoHeaders"
      :items="this.pliegos"
      title="Licitaciones Servicios GCBA"
      accionName="Ver"
      @accion="viewOne"
      @accion2="edit"
      @accion3="showDeleteWarning"
      v-show="viewList"
    />

    <PliegoInputService
      v-show="viewEdit"
      @close="closeView"
      :showBackBtn="true"
      btnName="Editar"
      @accion="editPliego()"
    />

    <Componentevista
      :bidding="onePliego"
      v-show="viewEvery"
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
  </div>
</template>

<script>
import componentevista from "../components/componentevista.vue";
import PliegoTable from "../components/PliegoTable.vue";
import { mapActions, mapState } from "vuex";
import Componentevista from "../components/componentevista.vue";
import PliegoInputService from "../components/service/PliegoInputService.vue";

export default {
    data() {
    return {
      onePliego: {},
      viewList: true,
      viewEdit: false,
      viewEvery: false,
      dialog: false,
      idDelete: "",
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
        // {text:"Monto Adjudicado", value: "AllocatedBudget"},
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
    componentevista,
    PliegoTable,
    Componentevista,
    PliegoInputService,
  },
  methods: {
    ...mapActions("biddingService", [
      "getPliegos",
      "loadEditPliego",
      "editPliego",
      "deletePliego",
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
    changeView() {
      this.viewEvery = true;
      this.viewList = false;
      this.viewEdit = false;
    },
    closeView() {
      this.viewEvery = false;
      this.viewList = true;
      this.viewEdit = false;
    },

    showDeleteWarning(pliego) {
      this.dialog = !this.dialog;
      this.idDelete = pliego._id;
    },

    deleteBidding() {
      console.log(this.idDelete, "id delete antes de delete en vuex");
      this.deletePliego(this.idDelete);
    },
  },
  computed: {
    ...mapState({
      pliegos: (state) => state.biddingService.pliegos,
      contractor: (state) => state.biddingService.contractor,
      holidays: (state) => state.biddingService.holidays,
    }),
  },
  created() {
    this.getPliegos();
  },
}
</script>

<style>

</style>