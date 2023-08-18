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
            v-model="biddingService.BiddingNumber"
            :counter="64"
            label="N Licitacion"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="biddingService.RecordBAC"
            :counter="64"
            label="Expediente BAC OBRAS"
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="biddingService.Bidding"
            label="Obra"
            :counter="600"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="biddingService.Division"
            label="Reparticion"
            :counter="64"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="biddingService.Responsable"
            label="Responsable"
            :counter="64"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="biddingService.BiddingType"
            :items="types"
            label="Tipo Licitacion"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="biddingService.DirectContractType"
            :items="directContractType"
            label="Tipo Contratacion Directa"
            v-show="directContract"
            required
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <v-currency-field
            label="Presupuesto Oficial"
            v-model="biddingService.OfficialBudget"
          ></v-currency-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-menu
            v-model="menu12"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.DocumentEntryDate"
                label="Fecha Ingreso Expediente"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.DocumentEntryDate"
              @input="menu12 = false"
              locale="es-AR"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="3">
          <v-checkbox
            v-model="biddingService.DocumentationComplete"
            label="Documentacion Completa"
          ></v-checkbox>
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
          <v-select
            v-model="biddingService.Status"
            :items="status"
            label="Estado"
          >
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
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.EntryDocumentReview"
                label="Revision Pliego Ingreso"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.EntryDocumentReview"
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
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.ExitDocumentReview"
                label="Revision Pliego Egreso"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.ExitDocumentReview"
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
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.FirstPG"
                label="1ra Salida a PG"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.FirstPG"
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
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.FirstLapPG"
                label="1ra Vuelta de PG"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.FirstLapPG"
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
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.CallDate"
                label="Fecha Llamado"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.CallDate"
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
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.BidOpeningDate"
                label="Fecha Apertura de Ofertas"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.BidOpeningDate"
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
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.PreAdjudgmentActDate"
                label="Fecha Acta Preadjudicacion"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.PreAdjudgmentActDate"
              @input="menu7 = false"
              locale="es-AR"
            >
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col>
          <h3 v-if="biddingService.PreAdjudgmentActDate != ''">
            Limite de Impugnacion {{ challengePeriod }}
          </h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="9">
          <ContractorOffer :bidding="biddingService" :contractor="contractor" />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="biddingService.PreAdjudgmentActNumber"
            label="N acta Preadjudicada"
            :counter="64"
            :disabled="biddingNull"
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
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.SecondPG"
                label="2da Salida a PG"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.SecondPG"
              @input="menu8 = false"
              locale="es-AR"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="3">
          <v-menu
            v-model="menu9"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.SecondLapPG"
                label="2da vuelta de PG"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.SecondLapPG"
              @input="menu9 = false"
              locale="es-AR"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="biddingService.ApproveNumber"
            label="N de Aprobatoria"
            :counter="64"
            :disabled="biddingNull"
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
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.ApproveDate"
                label="Fecha Aprobatoria"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.ApproveDate"
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
            v-model="biddingService.AllocatedBudget"
            :disabled="biddingNull"
          ></v-currency-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            :value="porcentageSPO"
            label="% S/P.O"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <v-menu
            v-model="menu11"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.ContractDate"
                label="Perfeccion Orden de Compra"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.ContractDate"
              @input="menu11 = false"
              locale="es-AR"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="biddingService.PurchaseOrder"
            label="Orden de Compra"
            :counter="64"
            :disabled="biddingNull"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-menu
            v-model="menu15"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
            :disabled="biddingNull"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="biddingService.DueDatePO"
                label="Vencimiento Orden de Compra"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="biddingService.DueDatePO"
              @input="menu15 = false"
              locale="es-AR"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            :value="totalPOday"
            label="Dias antes de vencimiento OC"
            :counter="64"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="biddingService.PurchaseOrderMode"
            :items= "['ABIERTA', 'CERRADA']"
            label="Modalidad Orden"
            required
            :disabled="biddingNull"
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            :value="totalBiddingDays"
            label="Dias de Tramites Total"
            :counter="64"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8">
          <h3 class="justify-center">Ampliatoria</h3>
          <BiddingExtension :biddingService="biddingService" />
        </v-col>

        <v-col cols="4">
          <h3 class="justify-center">Prorroga</h3>
          <BiddingProrogation :biddingService="biddingService" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="9">
          <v-textarea
            v-model="biddingService.Observations"
            name="Observaciones"
            label="Observaciones"
            auto-grow
            :counter="300"
            :disabled="biddingNull"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <!-- cierre genera-->
    <v-btn color="primary" @click="send">{{ btnName }}</v-btn>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ContractorOffer from "./ContractorOffer.vue";
import BiddingExtension from "./BiddingExtension.vue";
import BiddingProrogation from "./BiddingProrogation.vue";
import Days from "../Helpers/Days";

export default {
  components: {
    ContractorOffer,
    BiddingExtension,
    BiddingProrogation,
  },
  props: {
    showBackBtn: Boolean,
    btnName: String,
  },
  data() {
    return {
      valid: true,
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
      menu12: false,
      menu13: false,
      menu14: false,
      menu15: false,

      // vistas de data
      data2: false,
      data3: false,
      DirectContractTypes: ["tipo1", "tipo2", "tipo3"],
    };
  },
  computed: {
    ...mapState({
      biddingService: (state) => state.biddingService.biddingService,
      types: (state) => state.biddingService.types,
      status: (state) => state.biddingService.status,
      directContractType: (state) => state.biddingService.directContract,
      contractor: (state) => state.biddingService.contractor,
      holidays: (state) => state.biddingService.holidays,
    }),

    porcentageSPO() {
      return Math.fround(
        (this.biddingService.AllocatedBudget /
          this.biddingService.OfficialBudget -
          1) *
          100
      ).toFixed(2);
    },

    totalBiddingDays() {
      return Days.daysBetween(
        this.biddingService.DocumentEntryDate,
        this.biddingService.ContractDate,
        this.holidays
      );
    },

    totalPOday() {
      return Days.daysBetween(
        this.biddingService.ContractDate,
        this.biddingService.DueDatePO,
        this.holidays
      );
    },

    directContract() {
      return this.biddingService.BiddingType === "CONTRATACION DIRECTA"
        ? true
        : false;
    },

    challengePeriod() {
      let date = new Date(this.biddingService.PreAdjudgmentActDate);
      date.setDate(date.getDate() + 4);
      return this.biddingService.PreAdjudgmentActDate != ""
        ? date.toLocaleDateString()
        : "";
    },

    biddingNull(){
      return this.biddingService.Status === 'DESIERTA' ? true : false
    }

  },
  methods: {
    ...mapMutations("biddingService", ["cleanPliego"]),
    close() {
      this.$emit("close");
      this.cleanPliego();
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
  created() {
    this.cleanPliego();
  },
};
</script>

<style></style>
