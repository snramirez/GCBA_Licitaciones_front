<template>
  <PliegoTable 
    :headers="pliegoHeaders"
    :items="pliegos"
    title="Licitaciones GCBA"
    />
</template>

<script>
import PliegoTable from "../components/PliegoTable.vue";
export default {
    components:{
        PliegoTable,
    },
    data(){
        return {
            pliegoHeaders: [
                {text:"Nº Licitación", value: "BiddingNumber"},
                {text:"Expediente", value: "Record"},
                {text:"Expediente BAC OBRAS", value: "RecordBAC"},
                {text:"Obra", value: "Bidding", width: "300px"},
                {text:"Repartición", value: "Responsable"},
                {text:"Responsable", value: "Division"},
                {text:"Tipo Licitación", value: "BiddingType"},
                {text:"Presupuesto Oficial", value: "OfficialBudget"},
                {text:"Estado", value: "Status"},
                {text:"Revisión Pliegos ingreso", value: "EntryDocumentReview"},
                {text:"Revisión Pliegos egreso", value: "ExitDocumentReview"},
                {text:"1ª Salida a PG", value: "FirstPG"},
                {text:"1ª Vuelta de PG", value: "FirstLapPG"},
                {text:"Fecha Llamado", value: "CallDate", width: "200px"},
                {text:"Fecha Apertura de Ofertas", value: "BidOpeningDate"},
                {text:"Cantidad de Ofertas", value: "BidQuantity"},
                {text:"Fecha Acta Preadjudic.", value: "PreAdjudgmentActDate"},
                {text:"Nº Acta Preadj.", value: "PreAdjudgmentActNumber"},
                {text:"2º Salida a PG", value: "SecondPG"},
                {text:"2ª vuelta de PG", value: "SecondLapPG"},
                {text:"Cant. Días", value: "DayQuantity"},
                {text:"N° Aprobatoria", value: "ApproveNumber"},
                {text:"Fecha Aprobatoria", value: "ApproveDate"},
                {text:"Monto Adjudicado", value: "AllocatedBudget"},
                {text:"% S/P.O.", value: "SPO"},
                {text:"Contratista", value: "Contractor"},
                {text:"Fecha Contrato", value: "ContractDate"},
                {text:"Dias de trámite", value: "ProcedureDays"},
                {text:"OBSERVACIONES", value: "Observations"},
            ],
            pliegos: [{
                BiddingNumber: "663-19",
                Record: "26433958-19",
                RecordBAC: "NO CORRESPONDE",
                Bidding: "Escuela Primaria de Creacion FERREYRA N°3749",
                Responsable: "DGIGUB",
                Division: "DGIGUB",
                BiddingType: "LIC PUBLICA",        
                OfficialBudget: 197172844.96,
                Status: "CONTRATADA",
                EntryDocumentReview: "",
                ExitDocumentReview: "",
                FirstPG: "",
                FirstLapPG: "",
                CallDate: "2019-10-04T10:00:00.000Z",
                BidOpeningDate: "2019-11-07T10:00:00.000Z",
                BidQuantity: 17,
                PreAdjudgmentActDate: "2019-12-04T10:00:00.000Z",
                PreAdjudgmentActNumber: "21-19",
                SecondPG: "2019-12-06T10:00:00.000Z",
                SecondLapPG: "2019-12-18T10:00:00.000Z",
                DayQuantity: "",
                ApproveNumber: "RESOL-2019-101-GCABA-SSOBRAS",
                ApproveDate: "2019-12-20T10:00:00.000Z",
                AllocatedBudget : 180924162.76,
                SPO: 8.24,
                Contractor: "INGECONS SA",
                ContractDate: "2019-12-27T10:00:00.000Z",
                ProcedureDays: 50,
                Observations: ""
            },
            {
                BiddingNumber: "663-19",
                Record: "26433958-19",
                RecordBAC: "NO CORRESPONDE",
                Bidding: "Escuela Primaria de Creacion FERREYRA N°3749",
                Responsable: "DGIGUB",
                Division: "DGIGUB",
                BiddingType: "LIC PUBLICA",        
                OfficialBudget: 197172844.96,
                Status: "CONTRATADA",
                EntryDocumentReview: "",
                ExitDocumentReview: "",
                FirstPG: "",
                FirstLapPG: "",
                CallDate: "2019-10-04T10:00:00.000Z",
                BidOpeningDate: "2019-11-07T10:00:00.000Z",
                BidQuantity: 17,
                PreAdjudgmentActDate: "2019-12-04T10:00:00.000Z",
                PreAdjudgmentActNumber: "21-19",
                SecondPG: "2019-12-06T10:00:00.000Z",
                SecondLapPG: "2019-12-18T10:00:00.000Z",
                DayQuantity: "",
                ApproveNumber: "RESOL-2019-101-GCABA-SSOBRAS",
                ApproveDate: "2019-12-20T10:00:00.000Z",
                AllocatedBudget : 180924162.76,
                SPO: 8.24,
                Contractor: "INGECONS SA",
                ContractDate: "2019-12-27T10:00:00.000Z",
                ProcedureDays: 50,
                Observations: ""
            },
            {
                BiddingNumber: "663-19",
                Record: "26433958-19",
                RecordBAC: "NO CORRESPONDE",
                Bidding: "Escuela Primaria de Creacion FERREYRA N°3749",
                Responsable: "DGIGUB",
                Division: "DGIGUB",
                BiddingType: "LIC PUBLICA",        
                OfficialBudget: 197172844.96,
                Status: "CONTRATADA",
                EntryDocumentReview: "",
                ExitDocumentReview: "",
                FirstPG: "",
                FirstLapPG: "",
                CallDate: "2019-10-04T10:00:00.000Z",
                BidOpeningDate: "2019-11-07T10:00:00.000Z",
                BidQuantity: 17,
                PreAdjudgmentActDate: "2019-12-04T10:00:00.000Z",
                PreAdjudgmentActNumber: "21-19",
                SecondPG: "2019-12-06T10:00:00.000Z",
                SecondLapPG: "2019-12-18T10:00:00.000Z",
                DayQuantity: "",
                ApproveNumber: "RESOL-2019-101-GCABA-SSOBRAS",
                ApproveDate: "2019-12-20T10:00:00.000Z",
                AllocatedBudget : 180924162.76,
                SPO: 8.24,
                Contractor: "INGECONS SA",
                ContractDate: "2019-12-27T10:00:00.000Z",
                ProcedureDays: 50,
                Observations: ""
            }]																											
        } 
   }
}
</script>

<style>

</style>