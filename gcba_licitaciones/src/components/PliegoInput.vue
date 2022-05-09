<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.BiddingNumber"
          :rules="nameRules"
          :counter="24"
          label="N Licitacion"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="pliego.Record" label="Expediente"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.RecordBAC"
          :counter="20"
          label="Expediente BAC OBRAS"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="pliego.Bidding" label="Obra"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
        <v-col cols="12" md="3">
        <v-text-field v-model="pliego.Division" label="Reparticion">
        </v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.Responsable"
          label="Responsable"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="pliego.BiddingType"
          :items="tipo"
          label="Tipo Licitacion"
          required
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.OfficialBudget"
          label="Presupuesto Oficial"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-select v-model="pliego.Status" :items="estado" label="Estado">
        </v-select>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker label="Revision Pliego Ingreso" />
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="pliego.ExitDocumentReview" label="Revision Pliego Egreso" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <DatePicker :date="pliego.FirstPG" label="1ra Salida a PG" />
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="pliego.FirstLapPG" label="1ra Vuelta de PG" />
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="pliego.CallDate" label="Fecha Llamado" />
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker
          :date="pliego.BidOpeningDate"
          label="Fecha Apertura de Ofertas"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.BidQuantity"
          label="Cantidad de Ofertas"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker
          :date="pliego.PreAdjudgmentActDate"
          label="Fecha Acta Preadjudicacion"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.PreAdjudgmentActNumber"
          label="N acta Preadjudicada"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="pliego.SecondPG" label="2da Salida a PG" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <DatePicker :date="pliego.SecondLapPG" label="2da Vuelta de PG" />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.DayQuantity"
          label="Cantidad de dias"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.ApproveNumber"
          label="N de Aprobatoria"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="pliego.ApproveDate" label="Fecha Aprobatoria" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.AllocatedBudget"
          label="Monto Adjudicado"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.SPO"
          label="% S/P.O"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.Contractor"
          label="Contratista"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="pliego.ContractDate" label="Fecha Contrato" />
      </v-col>

      <v-col cols="3" md="3">
        <v-text-field
          v-model="pliego.ProcedureDays"
          label="Dias de tramites"
        ></v-text-field>
      </v-col>

      <v-col cols="9">
        <v-textarea
          v-model="pliego.Observations"
          :rules="descriptionRules"
          name="Observaciones"
          label="Observaciones"
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>

    <v-btn :disabled="!valid" color="success" type="submit"> Enviar </v-btn>
  </v-container>
</template>

<script>
import { TheMask } from "vue-the-mask";
import DatePicker from "./DatePicker.vue";

export default {
  components: {
    TheMask,
    DatePicker,
  },
  props: {
    pliego: Object,
  },
  data() {
    return {
      // pliego: {
      //   BiddingNumber: "",
      //   Record: "",
      //   RecordBAC: "",
      //   Bidding: "",
      //   Responsable: "",
      //   Division: "",
      //   BiddingType: "",
      //   OfficialBudget: "",
      //   Status: "",
      //   EntryDocumentReview: "",
      //   ExitDocumentReview: "",
      //   FirstPG: "",
      //   FirstLapPG: "",
      //   CallDate: "",
      //   BidOpeningDate: "",
      //   BidQuantity: "",
      //   PreAdjudgmentActDate: "",
      //   PreAdjudgmentActNumber: "",
      //   SecondPG: "",
      //   SecondLapPG: "",
      //   DayQuantity: "",
      //   ApproveNumber: "",
      //   ApproveDate: "",
      //   AllocatedBudget:  "",
      //   SPO: "",
      //   Contractor: "",
      //   ContractDate: "",
      //   ProcedureDays: "",
      //   Observations: ""
      // },
      valid: true,
      nameRules: [(v) => !!v || "El nombre es obligatorio"],
      phoneRules: [(v) => !!v || "El telefono es obligatorio"],
      descriptionRules: [(v) => !!v || "La descripcion es obligatoria"],
      emailRules: [
        (v) => /.+@.+\..+/.test(v) || "El email tiene que ser valido",
      ],
      tipo: ["Lic Publica", "Lic Privada"],
      estado: [
        "CONTRATADA",
        "SIN EFECTO",
        "ADJUDICADA",
        "EVALUACION DE OFERTAS",
        "PREADJUDICADA",
        "EN ESPERA",
      ],
      dateIngresoPliego: null,
      dateEgresoPliego: null,
    };
  },
  computed: {},
  methods: {
    dateChange(date){
      this.pliego.EntryDocumentReview = date;
    }
  },
  created() {},
};
</script>

<style></style>
