<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.BiddingNumber"
          :rules="nameRules"
          :counter="24"
          label="N Licitacion"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="bidding.Record" label="Expediente"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.RecordBAC"
          :counter="20"
          label="Expediente BAC OBRAS"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="bidding.Bidding" label="Obra"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field v-model="bidding.Division" label="Reparticion">
        </v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.Responsable"
          label="Responsable"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="bidding.BiddingType"
          :items="tipo"
          label="Tipo Licitacion"
          required
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.OfficialBudget"
          label="Presupuesto Oficial"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-select v-model="bidding.Status" :items="estado" label="Estado">
        </v-select>
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
              v-model="bidding.EntryDocumentReview"
              label="Revision Pliego Ingreso"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.EntryDocumentReview"
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
              v-model="bidding.ExitDocumentReview"
              label="Revision Pliego Egreso"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.ExitDocumentReview"
            @input="menu2 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-menu
          v-model="menu3"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bidding.FirstPG"
              label="1ra Salida a PG"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.FirstPG"
            @input="menu3 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="3">
        <v-menu
          v-model="menu4"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bidding.FirstLapPG"
              label="1ra Vuelta de PG"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.FirstLapPG"
            @input="menu4 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="3">
        <v-menu
          v-model="menu5"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bidding.CallDate"
              label="Fecha Llamado"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.CallDate"
            @input="menu5 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="3">
        <v-menu
          v-model="menu6"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bidding.BidOpeningDate"
              label="Fecha Apertura de Ofertas"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.BidOpeningDate"
            @input="menu6 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.BidQuantity"
          label="Cantidad de Ofertas"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-menu
          v-model="menu7"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bidding.PreAdjudgmentActDate"
              label="Fecha Acta Preadjudicacion"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.PreAdjudgmentActDate"
            @input="menu7 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.PreAdjudgmentActNumber"
          label="N acta Preadjudicada"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-menu
          v-model="menu8"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bidding.SecondPG"
              label="2da Salida a PG"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.SecondPG"
            @input="menu8 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-menu
          v-model="menu9"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bidding.SecondLapPG"
              label="2da Vuelta de PG"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.SecondLapPG"
            @input="menu9 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.DayQuantity"
          label="Cantidad de dias"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.ApproveNumber"
          label="N de Aprobatoria"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-menu
          v-model="menu10"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bidding.ApproveDate"
              label="Fecha Aprobatoria"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.ApproveDate"
            @input="menu10 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.AllocatedBudget"
          label="Monto Adjudicado"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="bidding.SPO" label="% S/P.O"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="bidding.Contractor"
          label="Contratista"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-menu
          v-model="menu11"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bidding.ContractDate"
              label="Fecha Contrato"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="bidding.ContractDate"
            @input="menu11 = false"
            locale="es-AR"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="3" md="3">
        <v-text-field
          v-model="bidding.ProcedureDays"
          label="Dias de tramites"
        ></v-text-field>
      </v-col>

      <v-col cols="9">
        <v-textarea
          v-model="bidding.Observations"
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
import { mapState } from "vuex";

export default {
  components: {
    TheMask,
    DatePicker,
  },
  props: {
  },
  data() {
    return {
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
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      menu6: false,
      menu7: false,
      menu8: false,
      menu9: false,
      menu10: false,
      menu11: false,
    };
  },
  computed: {
    ...mapState(["bidding"]),
  },
  methods: {
  },
  created() {},
};
</script>

<style></style>
