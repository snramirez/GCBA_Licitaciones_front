<template>
  <div>
    <PliegoTable 
        :headers="pliegoHeaders"
        :items="this.pliegos"
        title="Licitaciones GCBA"
        accionName="Ver"
        @accion="viewOne"
        />
  </div>
</template>

<script>
import PliegoTable from "../components/PliegoTable.vue";
import {mapActions, mapState} from "vuex"
export default {
    components:{
        PliegoTable,
    },
    methods: {
        ...mapActions(["getPliegos", "statusDate"]),
        prueba(){
            this.statusDate(['CONTRATADA','2019-12-17T10:00:00.000Z', '2019-12-27T10:00:00.000Z'])
        },
        viewOne(pliego){
            console.log(pliego)
            console.log('boton para ver completo')
        }
    },
    computed:{
        ...mapState(["pliegos"])
    },
    created(){
        this.getPliegos();
    },
    data(){
        return {

            pliegoHeaders: [
                {text:"Nº Licitación", value: "BiddingNumber"},
                {text:"Expediente", value: "Record", width: "130px"},
                {text:"Expediente BAC OBRAS", value: "RecordBAC"},
                {text:"Obra", value: "Bidding", width: "300px"},
                {text:"Repartición", value: "Responsable"},
                {text:"Responsable", value: "Division"},
                {text:"Tipo Licitación", value: "BiddingType"},
                {text:"Presupuesto Oficial", value: "OfficialBudget"},
                {text:"Estado", value: "Status"},
                // {text:"Revisión Pliegos ingreso", value: "EntryDocumentReview"},
                // {text:"Revisión Pliegos egreso", value: "ExitDocumentReview"},
                // {text:"1ª Salida a PG", value: "FirstPG"},
                // {text:"1ª Vuelta de PG", value: "FirstLapPG"},
                {text:"Fecha Llamado", value: "CallDate", width: "200px"},
                {text:"Fecha Apertura de Ofertas", value: "BidOpeningDate"},
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
                // {text:"Fecha Contrato", value: "ContractDate"},
                // {text:"Dias de trámite", value: "ProcedureDays"},
                // {text:"OBSERVACIONES", value: "Observations"},
                { text: "Accion", value: "actions", sortable: false }
            ],
            																											
        } 
   }
}
</script>

<style>

</style>