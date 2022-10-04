<template>
    <Pie class="pie-chart"
      :chart-options="chartOptions"
      :chart-data="charData.values"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
</template>
  
<script>
  import { Pie } from 'vue-chartjs/legacy'
  
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
  
  export default {
    name: 'PieChart',
    components: {
      Pie
    },
    props: {
      chartId: {
        type: String,
        default: 'pie-chart'
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
        default: () => {}
      },
      plugins: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      cart(){
        return this.$store.state.cart
      },
      //Getting Symbol name of coins
      symbolNames(){
        return this.cart.map(k=>{return k.symbol})
      },
      //Getting amount of coins
      symbolCounts(){
        return this.cart.map(k=>{return k.count})
      },
      charData(){
        return{  
          values: {
            labels :  this.symbolNames,            //['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets :  [
              {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16' , '#CB543B' , '#BB8479',
                '#6F5405', '#0DF58C', '#C018DE', '#E84354', '#10C418', '#BE8D24', '#28B4CD', '#D3C9D6',
                '#8AEB5C', '#520C86', '#D52D2D', '#A3B5FF', '#FFFB00', '#FFD997'
              ],
                //Giving the coin numbers to Pie-Chart
                data: this.symbolCounts
              }
            ]
          } 
        }
      }
    },

    data() {
      return {
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  }
</script>


<style>

.pie-chart{
    display: flex;
    justify-content: center;
    width: 50%;
    position: absolute;
    right: 0;
    top:42%;
    transform: translate(0,-50%);  
  }

</style>
  