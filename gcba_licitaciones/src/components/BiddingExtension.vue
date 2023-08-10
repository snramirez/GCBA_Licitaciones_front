<template>
  <div>
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
            <span>Nueva Extension</span>
          </v-tooltip>
        </v-row>

        <v-row>
          <v-data-table
            :headers="headers"
            :items="extensionDataTable()"
            hide-default-header
            hide-default-footer
            disable-pagination
            class="elevation-1"
          >
            <template v-slot:item.Budget="{ item }">
              <span>{{ priceFormater(item.Budget) }}</span>
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
                      @click="removeExtension(item)"
                    >
                      <v-icon>mdi-file-remove</v-icon>
                    </v-btn>
                  </template>
                  <span>Borrar Extension</span>
                </v-tooltip>
              </v-btn-toggle>
            </template>
          </v-data-table>
        </v-row>
      </v-col>

      <v-dialog v-model="addWindow" max-width="500">
        <v-card class="mx-auto my-10" max-width="500">
          <h2 class="d-flex justify-center pt-5">Nueva Extension</h2>
          <v-container class="pa-3">
            <v-form onSubmit="return false;" @submit="addExtension()">
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="extensionCode"
                    label="N de Ampliatoria"
                    :counter="64"
                  ></v-text-field>
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
                        v-model="extensionDate"
                        label="Fecha Ampliatoria"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="extensionDate"
                      @input="menu2 = false"
                      locale="es-AR"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="3">
                  <v-currency-field
                    label="Monto Ampliatoria"
                    v-model="budget"
                  ></v-currency-field>
                </v-col>
              </v-row>

              <v-row class="mt-8 mx-auto">
                <v-btn color="success" class="pa-2" type="submit"
                  >Agregar</v-btn
                >
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editWindow" max-width="500">
        <v-card class="mx-auto my-10" max-width="500">
          <h2 class="d-flex justify-center pt-5">Nueva Extension</h2>
          <v-container class="pa-3">
            <v-form onSubmit="return false;" @submit="editExtencion()">
              <v-row>

                <v-col cols="12" md="3">
                    <v-text-field
                    v-model="extensionCode"
                    label="N de Ampliatoria"
                    :counter="64"
                  ></v-text-field>
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
                        v-model="extensionDate"
                        label="Fecha Ampliatoria"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="extensionDate"
                      @input="menu = false"
                      locale="es-AR"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="3">
                  <v-currency-field
                    label="Monto Ampliatoria"
                    v-model="budget"
                  ></v-currency-field>
                </v-col>
              </v-row>

              <v-row class="mt-8 mx-auto">
                <v-btn color="success" class="pa-2" type="submit">Editar</v-btn>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        //{ text: "id", value: "_id" },
        { text: "N Ampliatoria", value: "ExtensionCode" },
        { text: "Fecha Ampliatoria", value: "ExtensionDate" },
        { text: "Monto", value: "Budget" },
        { text: "Accion", value: "actions", sortable: false },
      ],
      addWindow: false,
      editWindow: false,
      menu: false,
      menu2: false,
      extensionDate: '',
      extensionCode: '',
      budget: 0,
      editIndex: -1,
    };
  },

  props: {
    biddingService: Object,
  },
  methods:{
    showAdd() {
      this.addWindow = !this.addWindow;
    },

    showEdit() {
      this.editWindow = !this.editWindow;
    },

    extensionDataTable(){
        return this.biddingService.ExtensionData
    },

    addExtension(){
        this.biddingService.ExtensionData.push({
            ExtensionCode: this.extensionCode,
            ExtensionDate: this.extensionDate,
            Budget: this.budget
        })

        this.cleanNewContractorView();
        this.showAdd();
    },

    cleanNewContractorView() {
      this.extensionCode = '', 
      this.extensionDate = '',
      this.budget = 0;
    },

    loadEdit(item) {
      this.showEdit();
      this.extensionCode = item.ExtensionCode, 
      this.extensionDate = item.ExtensionDate,
      this.budget = item.Budget;
      this.editIndex = this.biddingService.ExtensionData.indexOf(item)
    },

    removeExtension(item) {
      let indexEdit = this.biddingService.ExtensionData.indexOf(item);
      this.biddingService.ExtensionData.splice(indexEdit, 1);
    },

    editExtencion(){
        this.biddingService.ExtensionData[this.editIndex] = {
            ExtensionCode: this.extensionCode,
            ExtensionDate: this.extensionDate,
            Budget: this.budget
        }
        this.showEdit();
        this.cleanNewContractorView();
    },

    priceFormater(num) {
      const formatter = new Intl.NumberFormat("es-AR");
      return formatter.format(num);
    },
  }

};
</script>

<style></style>
