<template>
    <div>
        <v-container>
            <v-form ref="form" @submit.prevent="validate">
                <v-row>
                    <v-col cols="12" md="3">
                        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="startDate" label="Fecha Inicio" prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on" :disabled="checkbox"></v-text-field>
                            </template>
                            <v-date-picker v-model="startDate" @input="menu = false" locale="es-AR"></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="finishDate" label="Fecha Fin" prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on" :disabled="checkbox"></v-text-field>
                            </template>
                            <v-date-picker v-model="finishDate" @input="menu2 = false" locale="es-AR"></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>

                <v-checkbox v-model="checkbox" label="Historico"></v-checkbox>

                <v-row>
                    <v-col>
                        <v-btn type="submit">Buscar</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>

        <v-divider></v-divider>

        <v-container>
            <v-row>
                <v-col cols="12" md="3">
                    <TableGraph :headers="headers" :items="items" />
                </v-col>
                <v-col cols="12" md="9">
                    <BarChart :chartData="chartData" :chartOptions="chartOptions" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import BarChart from '../components/BarChart.vue'
import TableGraph from '../components/TableGraph.vue'
import DoughnutChart from '../components/DoughnutChart.vue'
import { mapActions } from "vuex";

export default {
    data() {
        return {
            startDate: "",
            finishDate: "",
            menu: false,
            menu2: false,
            checkbox: false,
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Licitaciones',
                        backgroundColor: '#f87979',
                        data: []
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
            headers: [
                { text: "Nombre", value: "_id" },
                { text: "Cantidad", value: "total" },
                { text: "Porcentaje", value: "percentage" }
            ],
            items: [],
        };
    },
    components: {
        BarChart,
        TableGraph,
        DoughnutChart
    },
    methods: {
        ...mapActions(['biddingStatus']),

        async validate() {
            this.cleanGraph()
            let query = {}
            if (this.checkbox) {
                query.startDate = new Date(1000, 1, 1)
                query.finishDate = new Date(3000, 1, 1)
            }
            else {
                query.startDate = this.startDate
                query.finishDate = this.finishDate
            }

            let res = await this.biddingStatus(query)
            res.forEach(element => {
                this.chartData.labels.push(element._id)
                this.chartData.datasets[0].data.push(element.total)
            });

            this.calculatePercentage(res)
            this.items = res
        },

        cleanGraph() {
            this.chartData.labels = []
            this.chartData.datasets[0].data = []
        },

        calculatePercentage(datos) {
            let total = 0;
            datos.forEach(element => {
                total += element.total
            })

            datos.forEach(element => {
                element.percentage = ((element.total / total) * 100).toFixed(2).toString() + "%"
            })
        }
    }
}
</script>

<style>
</style>