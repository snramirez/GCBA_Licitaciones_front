<template>
    <v-container>
        <!--botonera de modificacion-->
        <v-row>

            <v-col>
                <v-form>
                    <v-row v-for="(item, index) in data" :key="item._id">
                        <v-text-field cols="4" class="ms-4" :value="item.Name" label="Razon Social" filled dense
                            readonly>
                        </v-text-field>
                        <v-text-field cols="4" class="ms-4" :value="item.Cuit" label="CUIT" filled dense readonly>

                            <template slot="append-outer">
                                <v-btn color="success" @click="loadEdit(item)">
                                    Modificar</v-btn>
                                <v-btn color="error" @click="deleteContractor(item._id)">
                                    Baja</v-btn>
                            </template>
                        </v-text-field>
                    </v-row>
                </v-form>


                <!--boton agregar   -->
                <v-btn class="mx-2" fab dark color="indigo" @click="showAdd">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>

                <v-dialog v-model="addWindow" max-width="500px">
                    <v-card>
                        <v-form onSubmit="return false;"
                            @submit="saveContractor({ Name: Name, Cuit: Cuit }); showAdd()">
                            <v-text-field label="Nombre" filled dense v-model="Name"></v-text-field>
                            <v-text-field label="Cuit" filled dense v-model="Cuit"></v-text-field>
                            <v-btn color="success" class="pa-2" type="submit">Agregar</v-btn>
                        </v-form>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="editWindow" max-width="500px">
                    <v-card>
                        <v-form onSubmit="return false;"
                            @submit="editContractor({ id: edit.id, data: { Name: edit.Name, Cuit: edit.Cuit } }); showEdit()">
                            <v-text-field label="Nombre" filled dense v-model="edit.Name" :value="edit.Name">
                            </v-text-field>
                            <v-text-field label="Cuit" filled dense v-model="edit.Cuit" :value="edit.Cuit">
                            </v-text-field>
                            <v-btn color="success" class="pa-2" type="submit">Editar</v-btn>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>

    </v-container>

</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            addWindow: false,
            editWindow: false,
            Name: '',
            Cuit: '',
            edit: {
                Name: '',
                Cuit: '',
                id: ''
            }
        }

    },
    props: {
        titulo: String,
        data: Array
    },

    methods: {
        ...mapActions(['deleteContractor', 'saveContractor', 'editContractor']),
        showAdd() {
            this.addWindow = !this.addWindow
        },

        showEdit() {
            this.editWindow = !this.editWindow
        },

        loadEdit(item) {
            this.edit.Name = item.Name
            this.edit.Cuit = item.Cuit
            this.edit.id = item._id
            this.showEdit()
        }
    }


}
</script>

