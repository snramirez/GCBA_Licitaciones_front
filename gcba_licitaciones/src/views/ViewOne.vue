<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="pliego.name"
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
export default {

}
</script>

<style>

</style>