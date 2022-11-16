<template>
  <v-container>
    <v-row v-show="showBackBtn">
      <v-col align-self="end">
        <v-btn @click="close()" color="orange darken-1">
          <v-icon dark left> mdi-arrow-left </v-icon>
          Volver
        </v-btn>
      </v-col>
    </v-row>
    <!-- primer=unidades  10-->
    <v-container class="mx-auto">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="bidding.BiddingNumber"
            :counter="64"
            label="N Licitacion"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="bidding.Record"
            label="Expediente"
            :counter="64"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="bidding.RecordBAC"
            :counter="64"
            label="Expediente BAC OBRAS"
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field v-model="bidding.Bidding" label="Obra" :counter="600"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model="bidding.Division" label="Reparticion" :counter="64">
          </v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="bidding.Responsable"
            label="Responsable"
            :counter="64"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="bidding.BiddingType"
            :items="types"
            label="Tipo Licitacion"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-currency-field
            label="Presupuesto Oficial"
            v-model="bidding.OfficialBudget"
          ></v-currency-field>
        </v-col>
      </v-row>
    </v-container>


    <!--botones-->
    <div align="center" justify="space-around">
      <v-btn outlined fab color="teal" @click="data2 = !data2">
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-btn>
      2da Parte
    </div>

    <!--2da unidad -->

    <v-container class="mx-auto" v-show="data2">
      <v-row>
        <v-col cols="12" md="3">
          <v-select v-model="bidding.Status" :items="status" label="Estado">
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
      </v-row>

      <v-row>
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
            >
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="9">
          <ContractorOffer />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="bidding.PreAdjudgmentActNumber"
            label="N acta Preadjudicada"
            :counter="64"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <!-- 3ra unidad=9-->
    <div align="center" justify="space-around">
      <v-btn outlined fab color="teal" @click="data3 = !data3">
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-btn>
      3ra Parte
    </div>

    <v-container class="mx-auto" v-show="data3">
      <v-row>
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

        <v-col cols="12" md="3">
          <v-text-field
            v-model="bidding.DayQuantity"
            label="Cantidad de dias"
            :counter="64"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="bidding.ApproveNumber"
            label="N de Aprobatoria"
            :counter="64"
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
          <v-currency-field
            label="Monto Adjudicado"
            v-model="bidding.AllocatedBudget"
          ></v-currency-field>
        </v-col>
        

        <v-col cols="12" md="3">
          <v-text-field v-model="SPO" label="% S/P.O" readonly></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="bidding.Contractor"
            :items="onlyNameContractor()"
            label="Contratista"
            required
          ></v-select>
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
            :counter="64"
          ></v-text-field>
        </v-col>

        <v-col cols="9">
          <v-textarea
            v-model="bidding.Observations"
            name="Observaciones"
            label="Observaciones"
            auto-grow
            :counter="300"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <!-- cierre genera-->
    <v-btn color="primary" @click="send">{{ btnName }}</v-btn>
  </v-container>
</template>

<script>
import { mask } from "vue-the-mask";
import { VMoney } from "v-money"
import { mapState, mapMutations } from "vuex";
import ContractorOffer from "./ContractorOffer.vue";

export default {
  components: {
    ContractorOffer,
  },
  props: {
    showBackBtn: Boolean,
    btnName: String,
  },
  directives:{
    mask,
    money: VMoney
  },
  data() {
    return {
      valid: true,
      money: {
          decimal: ',',
          thousands: '.',
          precision: 2,
          masked: false /* doesn't work with directive */
      },
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

      // vistas de data
      data2: false,
      data3: false,
      prueba: "",
      SPO: ""
    };
  },
  computed: {
    ...mapState(["bidding", "types", "status", "contractor"]),

    porcentageSPO(){
      this.SPO = (Math.fround(((this.bidding.AllocatedBudget / this.bidding.OfficialBudget) - 1) * 100)).toFixed(2)
    }
  },
  methods: {
    ...mapMutations(['cleanPliego']),
    close() {
      this.$emit("close");
      this.cleanPliego()
    },

    send() {
      this.$emit("accion");
    },

    onlyNameContractor() {
      let contractorName = [];
      this.contractor.forEach((element) => contractorName.push(element.Name));
      return contractorName;
    },
  },
  created(){
    this.cleanPliego()
  },
};
</script>

<style></style>
