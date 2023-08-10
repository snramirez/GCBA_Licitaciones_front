<template>
  <v-container>
    <v-col>
      <v-row>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              justify="space-around"
              v-bind="attrs"
              v-on="on"
              small
              @click="showAdd"
            >
              <v-icon>mdi-file-document-plus</v-icon>
            </v-btn>
          </template>
          <span>Nuevo Oferta</span>
        </v-tooltip>
      </v-row>
      <v-row>
        <v-data-table
          :headers="headers"
          :items="offerDataTable()"
          :item-class="itemRowBackground"
          hide-default-header
          hide-default-footer
          disable-pagination
          class="elevation-1"
        >

          <template v-slot:item.Quantity="{ item }">
            <span>{{ priceFormater(item.Quantity) }}</span>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    justify="space-around"
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="loadEdit(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    justify="space-around"
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="removeOffer(item)"
                  >
                    <v-icon>mdi-file-remove</v-icon>
                  </v-btn>
                </template>
                <span>Borrar Oferta</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    justify="space-around"
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="Winner(item)"
                  >
                    <v-icon>mdi-check-bold</v-icon>
                  </v-btn>
                </template>
                <span>Ganador Licitacion</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    justify="space-around"
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="notWinner(item)"
                  >
                    <v-icon>mdi-close-thick</v-icon>
                  </v-btn>
                </template>
                <span>Borrar Ganador</span>
              </v-tooltip>
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

            <v-row
              class="mx-auto"
              v-for="(item, index) in parnetContractor"
              :key="index"
            >
              {{ item }}
              <v-btn
                icon
                x-small
                fab
                color="#EC607E"
                @click="removeParnet(item)"
              >
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

            <v-row
              class="mx-auto"
              v-for="(item, index) in parnetContractor"
              :key="index"
            >
              {{ item }}
              <v-btn
                icon
                x-small
                fab
                color="#EC607E"
                @click="removeParnet(item)"
              >
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
        let nameContractors = "";
        console.log(element.Contractor);
        element.Contractor.forEach((item) => {
          nameContractors = nameContractors.concat(
            this.getNameContractor(item),
            " - "
          );
        });
        console.log(nameContractors);

        data.push({
          _id: element.Contractor,
          Contractor: nameContractors,
          Quantity: element.Quantity,
          Winner: element.Winner,
          Porcentage:
            Math.round(
              (element.Quantity / this.bidding.OfficialBudget - 1) * 100
            ) + "%",
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
      let idContractors = [];
      this.parnetContractor.forEach((item) => {
        idContractors.push(this.getIdContractor(item));
      });

      this.bidding.BidQuantity.push({
        Contractor: idContractors,
        Quantity: this.offer,
        Winner: false,
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
      this.parnetContractor = item.Contractor.split(" - ");
      this.parnetContractor = this.parnetContractor.filter(
        (elem) => elem !== ""
      );
    },

    editOffer() {
      let newIds = [];
      this.parnetContractor.forEach((item) => {
        newIds.push(this.getIdContractor(item));
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

    addParnet() {
      this.parnetContractor.push(this.newContractor);
    },

    removeParnet(item) {
      let index = this.parnetContractor.indexOf(item);
      index > -1 ? this.parnetContractor.splice(index, 1) : 0;
    },

    Winner(item) {
      this.bidding.BidQuantity.forEach((element) => {
        if (element.Contractor === item._id) {
          element.Winner = true;
        } else {
          element.Winner = false;
        }
      });
    },

    notWinner(item) {
      this.bidding.BidQuantity.forEach((element) => {
        if (element.Contractor === item._id) {
          element.Winner = false;
        }
      });
    },

    priceFormater(num) {
      const formatter = new Intl.NumberFormat("es-AR");
      return formatter.format(num);
    },

    itemRowBackground(item) {
      return item.Winner ? "style-1" : "";
    },
  },
  computed: {},
};
</script>

<style>
.style-1 {
  background-color: #FFD500 ;
}
.style-2 {
  background-color: rgb(114, 114, 67);
}
</style>
