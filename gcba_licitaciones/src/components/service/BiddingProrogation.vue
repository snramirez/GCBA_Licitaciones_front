<template>
  <div>
    <v-container>
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
            <span>Nueva Prorroga</span>
          </v-tooltip>
        </v-row>

        <v-row>
          <v-data-table
            :headers="headers"
            :items="prorogationDataTable()"
            hide-default-footer
            disable-pagination
            class="elevation-1"
          >

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
                      @click="removeProrogation(item)"
                    >
                      <v-icon>mdi-file-remove</v-icon>
                    </v-btn>
                  </template>
                  <span>Borrar Prorroga</span>
                </v-tooltip>
              </v-btn-toggle>
            </template>
          </v-data-table>
        </v-row>

        <v-dialog v-model="addWindow" max-width="500">
        <v-card class="mx-auto my-10" max-width="500">
          <h2 class="d-flex justify-center pt-5">Nueva Prorroga</h2>
          <v-container class="pa-3">
            <v-form onSubmit="return false;" @submit="addProrogation()">
              
              <v-text-field
                v-model="prorogationCode"
                label="Acta Prorroga"
              ></v-text-field>

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
                    v-model="prorogationDate"
                    label="Fecha Prorroga"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="prorogationDate"
                  @input="menu = false"
                  locale="es-AR"
                ></v-date-picker>
              </v-menu>


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
          <h2 class="d-flex justify-center pt-5">Editar Prorroga</h2>
          <v-container class="pa-3">
            <v-form onSubmit="return false;" @submit="editProrogation()">
              
              <v-text-field
                v-model="prorogationCode"
                label="Acta Prorroga"
              ></v-text-field>

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
                    v-model="prorogationDate"
                    label="Fecha Prorroga"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="prorogationDate"
                  @input="menu = false"
                  locale="es-AR"
                ></v-date-picker>
              </v-menu>

              <v-row class="mt-8 mx-auto">
                <v-btn color="success" class="pa-2" type="submit"
                  >Editar</v-btn
                >
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
        { text: "Acta", value: "ProrrogationCode" },
        { text: "Vencimiento", value: "ProrogationDate" },
        { text: "Accion", value: "actions", sortable: false },
      ],
      addWindow: false,
      editWindow: false,
      menu: false,
      menu2: false,
      prorogationDate: "",
      prorogationCode: "",
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

    addProrogation() {
      this.biddingService.ProrogationExpired.push({
        ProrogationDate: this.prorogationDate,
        ProrrogationCode: this.prorogationCode
      });

      this.cleanView();
      this.showAdd();
    },

    cleanView() {
      this.prorogationDate = '',
      this.prorogationCode = ''
    },

    prorogationDataTable(){
      //por que no se actulizan los datos si no, cuando se editan los campos de
      //ProrogationExpired no se actualiza la vista de tabla
      let length = this.biddingService.ProrogationExpired.length;
      return this.biddingService.ProrogationExpired.slice(0, length);
      // let data = []
      // this.biddingService.ProrogationExpired.forEach(prorrogation => {
      //   data.push({
      //       ProrogationDate: prorrogation.ProrogationDate
      //   })
      // })
      // return data
    },

    loadEdit(item) {
      this.showEdit();
      (this.prorogationDate = item.ProrogationDate),
      (this.prorogationCode = item.ProrrogationCode),
      this.editIndex = this.biddingService.ProrogationExpired.indexOf(item);
    },

    removeProrogation(item) {
      let indexEdit = this.biddingService.ProrogationExpired.indexOf(item);
      this.biddingService.ProrogationExpired.splice(indexEdit, 1);
    },

    editProrogation() {
      this.biddingService.ProrogationExpired[this.editIndex] = {
        ProrogationDate: this.prorogationDate,
        ProrrogationCode: this.prorogationCode
      }
      this.showEdit();
      this.cleanView();
    },
  },

}
</script>

<style>

</style>