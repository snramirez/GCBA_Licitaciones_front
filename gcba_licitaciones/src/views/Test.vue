<template>
  <v-container>
    <v-col>
      <v-row>
        <v-btn @click="showAdd">
          Nuevo Ofertante
          <v-icon>mdi-file-document-plus</v-icon>
        </v-btn>
      </v-row>
      <v-row>
        <v-data-table
          :headers="headers"
          :items="contractorAndOffer()"
          hide-default-header
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-btn justify="space-around" small>
                <v-icon>mdi-pencil</v-icon></v-btn
              >

              <v-btn justify="space-around" small
                ><v-icon> mdi-file-remove</v-icon></v-btn
              >
            </v-btn-toggle>
          </template>
        </v-data-table>
      </v-row>
    </v-col>

    <v-dialog v-model="addWindow" max-width="500px">
      <v-card>
        <v-form onSubmit="return false;" @submit="addContractorOffer">
          <v-col cols="12">
            <v-select v-model="newContractor" :items="onlyNameContractor()" label="Contratista" required></v-select>
        </v-col>
          <v-text-field label="Oferta" filled dense v-model="offer"></v-text-field>
          <v-btn color="success" class="pa-2" type="submit">Agregar</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      headers: [
        { text: "razon social", value: "Name" },
        { text: "Offer", value: "Offer" },
        { text: "Accion", value: "actions", sortable: false },
      ],
      addWindow: false,
      offer: 0,
      newContractor: '',
    };
  },
  methods: {
    ...mapActions(["biddingType"]),
    showAdd(){
      this.addWindow = !this.addWindow
    },

    onlyNameContractor(){
      let contractorName = []
      this.contractor.forEach(element => contractorName.push(element.Name))
      return contractorName
    },

    contractorAndOffer(){
      let contractorOffer = []
      this.bidding.BidQuantity.forEach(element => contractorOffer.push({Name: element.Contractor, Offer: element.Quantity}))
      return contractorOffer
    },

    addContractorOffer(){
      this.bidding.BidQuantity.push({Contractor: this.newContractor, Quantity: this.offer})
      this.cleanNewContractorView()
      this.showAdd()
    },

    cleanNewContractorView(){
      this.newContractor = '',
      this.offer = 0
    }
  },
  computed:{
    ...mapState(['contractor','bidding'])
  }
};
</script>

<style></style>
