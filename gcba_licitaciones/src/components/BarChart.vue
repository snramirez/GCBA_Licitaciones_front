<template>
  <div>
    <v-form ref="form" @submit.prevent="validate">
      <v-row>
        <v-col cols="12" md="3">
          <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
            offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="query.startDate" label="Fecha Inicio" prepend-icon="mdi-calendar" readonly
                v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="query.startDate" @input="menu = false" locale="es-AR"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="3">
          <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
            offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="query.finishDate" label="Fecha Fin" prepend-icon="mdi-calendar" readonly
                v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="query.finishDate" @input="menu2 = false" locale="es-AR"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn type="submit">Buscar</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
  </div>

</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
import { mapState, mapActions } from "vuex";


ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      query: {
        startDate: "",
        finishDate: "",
      },
      menu: false,
      menu2: false,
    }
  },
  methods: {
    ...mapActions(['biddingType']),

    async validate() {
      this.cleanGraph()
      let res = await this.biddingType(this.query)
      res.forEach(element => {
        this.chartData.labels.push(element._id)
        this.chartData.datasets[0].data.push(element.total)
      });
    },

    cleanGraph(){
      this.chartData.labels = []
      this.chartData.datasets[0].data = []
    }
  }
}
</script>
