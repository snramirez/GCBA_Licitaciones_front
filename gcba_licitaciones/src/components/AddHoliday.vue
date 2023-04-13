<template>

    <!--tipo de licitaciones-->
    <v-container>
        <h1>{{ titulo }}</h1>
        <v-row>
            <v-col>
                <v-form>
                    <v-row v-for="item in data" :key="item">
                        <v-text-field cols="4" class="ms-4" :value="item" :label="label" filled dense>
                            <template slot="append-outer">
                                <v-btn color="error"
                                    @click="deleteData({ data: item, dataType: dataType })">Borrar</v-btn>
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
                        <v-form @submit="saveData({ data: newType.substring(0,10), dataType: dataType }); dialog = !dialog"
                            onSubmit="return false;">
                            <v-menu 
                            v-model="menu" 
                            :close-on-content-click="false" 
                            :nudge-right="40"
                            transition="scale-transition" 
                            offset-y min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field 
                                    v-model="newType" 
                                    label="Feriado"
                                    prepend-icon="mdi-calendar" 
                                    readonly 
                                    v-bind="attrs" 
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker 
                                v-model="newType" 
                                @input="menu = false"
                                locale="es-AR"
                                ></v-date-picker>
                            </v-menu>
                            <v-btn type=submit color="success" class="pa-2">Agregar</v-btn>
                        </v-form>
                    </v-card>
                </v-dialog>

                <!--cierra boton agregar-->

            </v-col>
        </v-row>
    </v-container>

</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            dialog: false,
            newType: '',
            menu: false
        }
    },
    props: {
        titulo: String,
        label: String,
        data: Array,
        dataType: String
    },
    methods: {
        ...mapActions('bidding',['deleteData', 'saveData']),
        muestro() {
            this.newType = ''
            this.dialog = !this.dialog
        },
    },

}

</script>