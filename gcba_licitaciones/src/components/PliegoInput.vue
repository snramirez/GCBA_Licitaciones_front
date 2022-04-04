<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.name"
          :rules="nameRules"
          :counter="24"
          label="N Licitacion"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="pliego.cuit" label="Expediente"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.intern"
          :counter="20"
          label="Expediente BAC OBRAS"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field label="Obra"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field label="Obra"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field label="Reparticion"> </v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field label="Responsable"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="tipo" label="Tipo Licitacion" required></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          label="Presupuesto Oficial"
          v-mask="'###.###.###'"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="estado" label="Estado"> </v-select>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="dateIngresoPliego" label="Revision Pliego Ingreso" />
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="dateEgresoPliego" label="Revision Pliego Egreso" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <DatePicker :date="dateEgresoPliego" label="1ra Salida a PG" />
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="dateEgresoPliego" label="1ra Vuelta de PG" />
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="dateEgresoPliego" label="Fecha Llamado" />
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker
          :date="dateEgresoPliego"
          label="Fecha Apertura de Ofertas"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field label="Cantidad de Ofertas"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker
          :date="dateEgresoPliego"
          label="Fecha Acta Preadjudicacion"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field label="N acta Preadjudicada"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="dateEgresoPliego" label="2da Salida a PG" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <DatePicker :date="dateEgresoPliego" label="2da Vuelta de PG" />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field label="Cantidad de dias"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field label="N de Aprobatoria"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="dateEgresoPliego" label="Fecha Aprobatoria" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          label="Monto Adjudicado"
          v-mask="'###.###.###'"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field label="% S/P.O" v-mask="'#########%'"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field label="Contratista"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <DatePicker :date="dateEgresoPliego" label="Fecha Contrato" />
      </v-col>

      <v-col cols="3" md="3">
        <v-text-field label="Dias de tramites"></v-text-field>
      </v-col>

      <v-col cols="9">
        <v-textarea
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
  methods: {},
  created() {},
};
</script>

<style>
</style>