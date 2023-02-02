<template>
  <Bar :chart-data="chartData" :height="120" />
</template>

<script lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  props: ['chartLabelAr', 'chartDataAr'],
  data() {
    return {
      chartData: {
        labels: this.chartLabelAr,
        datasets: [
          {
            label: '6 months latest jobs',
            backgroundColor: '#f87979',
            data: this.chartDataAr,
          },
        ],
      },
    };
  },
});
</script>
