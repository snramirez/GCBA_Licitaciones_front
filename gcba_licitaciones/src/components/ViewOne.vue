<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.BiddingNumber"
          label="N Licitacion"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.Record"
          label="Expediente"
          filled
          readonly
        ></v-text-field>
      </v-col>

     <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.RecordBAC"
          label="Expediente BAC OBRAS"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.Bidding"
          label="Obra"
          filled
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.Division"
          label="Reparticion"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.Responsable"
          label="Responsable"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.BiddingType"
          label="Tipo Licitacion"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="formatBudget(bidding.OfficialBudget)"
          label="Presupuesto Oficial"
          filled
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.Status"
          label="Estado"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.EntryDocumentReview"
          label="Revision Pliego Ingreso"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.ExitDocumentReview"
          label="Revision Pliego Egreso"
          filled
          readonly
        ></v-text-field>
      </v-col>

       <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.FirstPG"
          label="1ra Salida a PG"
          filled
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.FirstLapPG"
          label="1ra Vuelta de PG"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.CallDate"
          label="Fecha Llamado"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.BidOpeningDate"
          label="Fecha Apertura de Ofertas"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.BidQuantity"
          label="Cantidad de Ofertas"
          filled
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.PreAdjudgmentActDate"
          label="Fecha Acta Preadjudicacion"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.PreAdjudgmentActNumber"
          label="N acta Preadjudicada"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.SecondPG"
          label="2da Salida a PG"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.SecondLapPG"
          label="2da Vuelta de PG"
          filled
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
     <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.DayQuantity"
          label="Cantidad de dias"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.ApproveNumber"
          label="N de Aprobatoria"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.ApproveDate"
          label="Fecha Aprobatoria"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="formatBudget(bidding.AllocatedBudget)"
          label="Monto Adjudicado"
          filled
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.SPO"
          label="% S/P.O"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.Contractor"
          label="Contratista"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.ContractDate"
          label="Fecha Contrato"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          :value="bidding.ProcedureDays"
          label="Dias de tramites"
          filled
          readonly
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-textarea
          :value="bidding.Observations"
          name="Observaciones"
          label="Observaciones"
          auto-grow
          filled
          readonly
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
        <v-btn @click="close">Cerrar</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  props:{
    bidding: Object
  },
  methods:{
      close(){
          this.$emit("close")
      },
      formatBudget(budget){
          return budget === null ? 0 : budget.$numberDecimal
      }
  },
}
</script>

<style>

</style>