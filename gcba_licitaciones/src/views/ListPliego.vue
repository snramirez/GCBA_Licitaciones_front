<template>
    <div>
        <PliegoTable :headers="pliegoHeaders" :items="this.pliegos" title="Licitaciones GCBA" accionName="Ver"
            @accion="viewOne" @accion2="edit" v-show="viewList" />
        
            <PliegoInput v-show="viewEdit"  @close="closeView" :showBackBtn="true" btnName="Editar" @accion="editPliego()"/>

        <Componentevista :bidding="onePliego" v-show="viewEvery" @close="closeView" />
    </div>
</template>

<script>
import componentevista from "../components/componentevista.vue";
import PliegoTable from "../components/PliegoTable.vue";
import ViewOne from "../components/ViewOne.vue";
import { mapActions, mapState } from "vuex"
import Componentevista from "../components/componentevista.vue";
import PliegoInput from "../components/PliegoInput.vue";
export default {
    data() {
        return {
            onePliego: { OfficialBudget: null, AllocatedBudget: null },
            viewList: true,
            viewEdit: false,
            viewEvery: false,
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
                { text: "Fecha Contrato", value: "ContractDate" },
                // {text:"Dias de trámite", value: "ProcedureDays"},
                // {text:"OBSERVACIONES", value: "Observations"},
                { text: "Accion", value: "actions", sortable: false }
            ],

        }
    },
    components: {
        componentevista,
        PliegoTable,
        ViewOne,
        Componentevista,
        PliegoInput,
    },
    methods: {
        ...mapActions(["getPliegos", "statusDate", "loadEditPliego", 'editPliego']),
        prueba() {
            this.statusDate(['CONTRATADA', '2019-12-17T10:00:00.000Z', '2019-12-27T10:00:00.000Z'])
        },
        viewOne(pliego) {
            this.onePliego = pliego
            this.viewList = false
            this.viewEvery = true
            this.viewEdit = false
        },
        edit(pliego) {
            this.loadEditPliego(pliego)
            this.viewEdit = true
            this.viewEvery = false
            this.viewList = false

        },
        changeView() {
            this.viewEvery = true
            this.viewList = false
            this.viewEdit = false

        },
        closeView () {
            this.viewEvery = false
            this.viewList = true
            this.viewEdit = false
        },



    },
    computed: {
        ...mapState(["pliegos"])
    },
    created() {
        this.getPliegos()
    },
}
</script>

<style>

</style>