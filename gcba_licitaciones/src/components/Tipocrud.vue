<template>

    <!--tipo de licitaciones-->
    <v-container>
        <h1>{{titulo}}</h1>
        <v-row>
            <v-col>
                <v-form>
                    <v-row v-for="item in data" :key="item">
                        <v-text-field cols="4" class="ms-4" :value="item" :label="label" filled dense>
                            <template slot="append-outer">
                                <v-btn color="error">borrar</v-btn>
                            </template>
                        </v-text-field>
                    </v-row>
                </v-form>
                <!-- boton agregar -->
                <v-btn class="mx-2" fab dark color="indigo" @click="muestro">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>

                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-body>
                            <v-form>
                                <v-text-field :label="label"  filled dense></v-text-field>
                                <v-btn color="success" class="pa-2">Agregar</v-btn>

                            </v-form>

                        </v-card-body>
                    </v-card>
                </v-dialog>

                <!--cierra boton agregar-->

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
    props: {
        titulo:String,
        label:String,
        data: Array
    },
    methods: {
        muestro() {
            this.dialog = !this.dialog
        }
    }

}

</script>

