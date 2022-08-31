<template>
    <v-container>
        <!--botonera de modificacion-->
        <v-row>

            <v-col>
                <v-form>
                    <v-row v-for="(item, index) in data" :key="item._id">
                        <v-text-field cols="4" class="ms-4" :value="item.Name" label="Nombre" filled dense>
                        </v-text-field>
                        <v-text-field cols="4" class="ms-4" :value="item.Cuit" label="cuit" filled dense>

                            <template slot="append-outer">
                                <v-btn color="success">modificar</v-btn>
                                <v-btn color="error">bajas</v-btn>
                            </template>

                        </v-text-field>
                    </v-row>
                </v-form>


                <!--boton agregar   -->
                <v-btn class="mx-2" fab dark color="indigo" @click="muestra">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>

                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-body>
                            <v-form>
                                <v-text-field label="Nombre" filled dense></v-text-field>
                                <v-text-field label="Cuit" filled dense> </v-text-field>
                                <v-btn color="success" class="pa-2">agregar</v-btn>

                            </v-form>

                        </v-card-body>
                    </v-card>
                </v-dialog>

            </v-col>
        </v-row>

    </v-container>

</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        }

    },
    props:{
        titulo:String,
        data: Array
    },

    methods: {
        muestra() {
            this.dialog = !this.dialog
        }
    }


}
</script>

