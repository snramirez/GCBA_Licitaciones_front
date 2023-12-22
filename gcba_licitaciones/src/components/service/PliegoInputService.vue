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
          <DatePicker
            @update-date="updateDocumentEntryDate"
            :initialDate=biddingService.DocumentEntryDate
            message="Fecha Ingreso Expediente"
          />
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
          <DatePicker
            @update-date="updateEntryDocumentReview"
            :initialDate=biddingService.EntryDocumentReview
            message="Revision Pliego Ingreso"
          />
        </v-col>

        <v-col cols="12" md="3">
          <DatePicker
            @update-date="updateExitDocumentReview"
            :initialDate=biddingService.ExitDocumentReview
            message="Revision Pliego Egreso"
          />
        </v-col>

        <v-col cols="12" md="3">
          <DatePicker
            @update-date="updateFirstPG"
            :initialDate=biddingService.FirstPG
            message="1ra Salida a PG"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <DatePicker
            @update-date="updateFirstLapPG"
            :initialDate=biddingService.FirstLapPG
            message="1ra Vuelta de PG"
          />
        </v-col>

        <v-col cols="12" md="3">
          <DatePicker
            @update-date="updateCallDate"
            :initialDate=biddingService.CallDate
            message="Fecha Llamado"
          />
        </v-col>

        <v-col cols="12" md="3">
          <DatePicker
            @update-date="updateBidOpeningDate"
            :initialDate=biddingService.BidOpeningDate
            message="Fecha Apertura de Ofertas"
          />
        </v-col>

        <v-col cols="12" md="3">
          <DatePicker
            @update-date="updatePreAdjudgmentActDate"
            :initialDate=biddingService.PreAdjudgmentActDate
            message="Fecha Acta Preadjudicacion"
          />
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
          <DatePicker
            @update-date="updateSecondPG"
            :initialDate=biddingService.SecondPG
            message="2da Salida a PG"
          />
        </v-col>

        <v-col cols="12" md="3">
          <DatePicker
            @update-date="updateSecondLapPG"
            :initialDate=biddingService.SecondLapPG
            message="2da vuelta de PG"
          />
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
          <DatePicker
            @update-date="updateApproveDate"
            :initialDate=biddingService.ApproveDate
            message="Fecha Aprobatoria"
          />
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
          <DatePicker
            @update-date="updateContractDate"
            :initialDate=biddingService.ContractDate
            message="Perfeccion Orden de Compra"
          />
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
          <DatePicker
            @update-date="updateDueDatePO"
            :initialDate=biddingService.DueDatePO
            message="Vencimiento Orden de Compra"
          />
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
    <h1>{{ biddingService.BidQuantity.lenght }}</h1>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ContractorOffer from "../building/ContractorOffer.vue";
import BiddingExtension from "./BiddingExtension.vue";
import BiddingProrogation from "./BiddingProrogation.vue";
import Days from "../../Helpers/Days";
import DatePicker from "../extras/datePicker.vue";

export default {
  components: {
    ContractorOffer,
    BiddingExtension,
    BiddingProrogation,
    DatePicker,
  },
  props: {
    showBackBtn: Boolean,
    btnName: String,
  },
  data() {
    return {
      valid: true,
      // vistas de data
      data2: false,
      data3: false,
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

    updateDocumentEntryDate(date) {
      this.biddingService.DocumentEntryDate = date.date;
    },
    updateEntryDocumentReview(date) {
      this.biddingService.EntryDocumentReview = date.date;
    },
    updateExitDocumentReview(date) {
      this.biddingService.ExitDocumentReview = date.date;
    },
    updateFirstPG(date) {
      this.biddingService.FirstPG = date.date;
    },
    updateFirstLapPG(date) {
      this.biddingService.FirstLapPG = date.date;
    },
    updateCallDate(date) {
      this.biddingService.CallDate = date.date;
    },
    updateBidOpeningDate(date) {
      this.biddingService.BidOpeningDate = date.date;
    },
    updatePreAdjudgmentActDate(date) {
      this.biddingService.PreAdjudgmentActDate = date.date;
    },
    updateSecondPG(date) {
      this.biddingService.SecondPG = date.date;
    },
    updateSecondLapPG(date) {
      this.biddingService.SecondLapPG = date.date;
    },
    updateApproveDate(date) {
      this.biddingService.ApproveDate = date.date;
    },
    updateContractDate(date) {
      this.biddingService.ContractDate = date.date;
    },
    updateDueDatePO(date) {
      this.biddingService.DueDatePO = date.date;
    },


  },
  created() {
    this.cleanPliego();
  },
};
</script>

<style></style>
