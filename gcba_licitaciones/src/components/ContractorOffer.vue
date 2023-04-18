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
  
      <v-dialog v-model="editWindow" max-width="500px">
        <v-card>
          <v-form onSubmit="return false;" @submit="editOffer">
            <v-col cols="12">
              <v-select v-model="newContractor" :items="onlyNameContractor()" label="Contratista" required></v-select>
          </v-col>
            <v-text-field label="Oferta" filled dense v-model="offer"></v-text-field>
            <v-btn color="success" class="pa-2" type="submit">Editar</v-btn>
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
          //{ text: "id", value: "_id" },
          { text: "razon social", value: "Contractor" },
          { text: "Offer", value: "Quantity" },
          { text: "Diferencia %", value: "Porcentage" },
          { text: "Accion", value: "actions", sortable: false },
        ],
        addWindow: false,
        editWindow: false,
        offer: 0,
        contractorId: '',
        newContractor: '',
      };
    },
    props: {
      contractor: Array,
      bidding: Object
    },

    methods: {
      showAdd(){
        this.addWindow = !this.addWindow
      },
  
      showEdit(){
        this.editWindow = !this.editWindow
      },

      offerDataTable(){
        let data = []
        this.bidding.BidQuantity.forEach( element => {
          data.push({
            _id: element.Contractor,
            Contractor: this.getNameContractor(element.Contractor),
            Quantity: element.Quantity,
            Porcentage: '%' + Math.round(((element.Quantity / this.bidding.OfficialBudget) - 1) * 100 )
          })
        })
        return data
      },
  
      onlyNameContractor(){
        let contractorName = []
        this.contractor.forEach(element => {contractorName.push(element.Name)})
        return contractorName
      },

      getIdContractor(name){
        let IdContractor = ''
        this.contractor.forEach(contractor => contractor.Name === name ? IdContractor = contractor._id : 0)
        return IdContractor
      },

      getNameContractor(id){
        let nameContractor = ''
        this.contractor.forEach(contractor => contractor._id === id ? nameContractor = contractor.Name : 0)
        return nameContractor
      },
  
      addContractorOffer(){
        let idContractor = this.getIdContractor(this.newContractor)
        this.bidding.BidQuantity.push({Contractor: idContractor, Quantity: this.offer})
        this.cleanNewContractorView()
        this.showAdd()
      },
  
      cleanNewContractorView(){
        this.newContractor = '',
        this.offer = 0
      },
  
      loadEdit(item){
        this.showEdit()
        this.newContractor = item.Contractor
        console.log("offer before ", item.Quantity)
        console.log("offer before decimal", item.Quantity.$numberDecimal)
        this.offer = item.Quantity
        console.log("offer after ",this.offer)
        this.contractorId = item._id
      },
  
      editOffer(){
        let newId = this.getIdContractor(this.newContractor)
        this.bidding.BidQuantity.forEach(element => {
          if (element.Contractor === this.contractorId){
            element.Contractor = newId
            element.Quantity = this.offer
          }
        })
        this.showEdit()
        this.cleanNewContractorView()
      },
  
      removeOffer(item){
        this.indexEdit = this.bidding.BidQuantity.indexOf(item)
        this.bidding.BidQuantity.splice(this.indexEdit, 1)
      },  
    },
    computed:{
    }
  };
  </script>
  
  <style></style>
  