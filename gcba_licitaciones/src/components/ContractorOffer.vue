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
          :items="offerDataTable()"
          hide-default-header
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-btn justify="space-around" small @click="loadEdit(item)">
                <v-icon>mdi-pencil</v-icon></v-btn
              >

              <v-btn justify="space-around" small @click="removeOffer(item)"
                ><v-icon> mdi-file-remove</v-icon></v-btn
              >
            </v-btn-toggle>
          </template>
        </v-data-table>
      </v-row>
    </v-col>

    <v-dialog v-model="addWindow" max-width="500">
      <v-card class="mx-auto my-10" max-width="500">
        <h2 class="d-flex justify-center pt-5">Nueva Oferta</h2>
        <v-container class="pa-3">
          <v-form onSubmit="return false;" @submit="addContractorOffer">
            <v-row>
              <v-col cols="2">
                <v-btn color="success" small fab @click="addParnet()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10">
                <v-select
                  v-model="newContractor"
                  :items="onlyNameContractor()"
                  label="Contratista"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="mx-auto" v-for="(item, index) in parnetContractor" :key="index">
              {{ item }}
              <v-btn icon x-small fab color="#EC607E" @click="removeParnet(item)">
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
            </v-row>

            <v-row class="mt-8 mx-auto">
              <v-currency-field
                label="Oferta"
                v-model="offer"
              ></v-currency-field>
              <v-btn color="success" class="pa-2" type="submit">Agregar</v-btn>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editWindow" max-width="500">
      <v-card class="mx-auto my-10" max-width="500">
        <h2 class="d-flex justify-center pt-5">Nueva Oferta</h2>
        <v-container class="pa-3">
          <v-form onSubmit="return false;" @submit="editOffer">
            <v-row>
              <v-col cols="2">
                <v-btn color="success" small fab @click="addParnet()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10">
                <v-select
                  v-model="newContractor"
                  :items="onlyNameContractor()"
                  label="Contratista"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="mx-auto" v-for="(item, index) in parnetContractor" :key="index">
              {{ item }}
              <v-btn icon x-small fab color="#EC607E" @click="removeParnet(item)">
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
            </v-row>

            <v-row class="mt-8 mx-auto">
              <v-currency-field
                label="Oferta"
                v-model="offer"
              ></v-currency-field>
              <v-btn color="success" class="pa-2" type="submit">Editar</v-btn>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      headers: [
        //{ text: "id", value: "_id" },
        { text: "razon social", value: "Contractor" },
        { text: "Offer", value: "Quantity" },
        { text: "Diferencia %", value: "Porcentage" },
        { text: "Accion", value: "actions", sortable: false },
      ],
      addWindow: false,
      editWindow: false,
      offer: 0,
      contractorId: [],
      newContractor: "",
      parnetContractor: [],
    };
  },
  props: {
    contractor: Array,
    bidding: Object,
  },

  methods: {
    showAdd() {
      this.addWindow = !this.addWindow;
    },

    showEdit() {
      this.editWindow = !this.editWindow;
    },

    offerDataTable() {
      let data = [];
      this.bidding.BidQuantity.forEach((element) => {
        
        let nameContractors = ""
        console.log(element.Contractor)
        element.Contractor.forEach(item => {
          nameContractors = nameContractors.concat(this.getNameContractor(item), ' - ')
        })
        console.log(nameContractors)

        data.push({
          _id: element.Contractor,
          Contractor: nameContractors,
          Quantity: element.Quantity,
          Porcentage:
            Math.round((element.Quantity / this.bidding.OfficialBudget - 1) * 100) + "%",
        });
      });
      return data;
    },

    onlyNameContractor() {
      let contractorName = [];
      this.contractor.forEach((element) => {
        contractorName.push(element.Name);
      });
      return contractorName;
    },

    getIdContractor(name) {
      let IdContractor = "";
      this.contractor.forEach((contractor) =>
        contractor.Name === name ? (IdContractor = contractor._id) : 0
      );
      return IdContractor;
    },

    getNameContractor(id) {
      let nameContractor = "";
      this.contractor.forEach((contractor) =>
        contractor._id === id ? (nameContractor = contractor.Name) : 0
      );
      return nameContractor;
    },

    addContractorOffer() {
      let idContractors = []
      this.parnetContractor.forEach(item => {
        idContractors.push(this.getIdContractor(item))
      })

      this.bidding.BidQuantity.push({
        Contractor: idContractors,
        Quantity: this.offer,
      });
      this.cleanNewContractorView();
      this.showAdd();
    },

    cleanNewContractorView() {
      (this.newContractor = ""), (this.offer = 0), (this.parnetContractor = []);
    },

    loadEdit(item) {
      this.showEdit();
      this.newContractor = "";
      this.offer = item.Quantity;
      this.contractorId = item._id;
      this.parnetContractor = item.Contractor.split(' - ')
      this.parnetContractor = this.parnetContractor.filter(elem => elem !== '')
    }, 

    editOffer() {
      let newIds = []
      this.parnetContractor.forEach(item => {
        newIds.push(this.getIdContractor(item))
      });

      this.bidding.BidQuantity.forEach((element) => {
        if (element.Contractor === this.contractorId) {
          element.Contractor = newIds;
          element.Quantity = this.offer;
        }
      });
      this.showEdit();
      this.cleanNewContractorView();
    },

    removeOffer(item) {
      let indexEdit = this.bidding.BidQuantity.indexOf(item);
      this.bidding.BidQuantity.splice(indexEdit, 1);
    },

    addParnet(){
      this.parnetContractor.push(this.newContractor)
    },

    removeParnet(item){
      let index = this.parnetContractor.indexOf(item)
      index > -1 ? this.parnetContractor.splice(index, 1): 0
    },
  },
  computed: {},
};
</script>

<style></style>
