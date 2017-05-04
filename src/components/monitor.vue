<template>
<div>
  <canvas id="myChart" width="50" height=""></canvas>
</div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'
export default {
  name: 'monitor',
  data () {
    return {
      temp: [],
      hum: [],
      all: []
    }
  },
  mounted () {
    let vm = this
    this.getData()
    setInterval(() => {
      vm.getData()
      setTimeout(() => {
        vm.getChart()
      }, 2000)
    }, 4000)
  },
  methods: {
    getChart () {
      var ctx = document.getElementById('myChart')
      var data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Temp',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.temp,
            spanGaps: false
          },
          {
            label: 'Hum',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(34,34,5,0.4)',
            borderColor: 'rgba(34,34,5,0.4)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(34,34,5,0.4)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(34,34,5,0.4)',
            pointHoverBorderColor: 'rgba(34,34,5,0.4)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.hum,
            spanGaps: false
          }
        ]
      }
      var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          animation: {
            animateScale: true
          }
        }
      })
      console.log(myChart)
    },
    getData () {
      let vm = this
      axios.get('https://smartfarm-1f904.firebaseio.com/data.json').then((res) => {
        for (var index in res.data) {
          if (res.data.hasOwnProperty(index)) {
            vm.all.push({
              ...res.data[index],
              id: index
            })
          }
          console.log(vm.all)
        }
        vm.temp = vm.all.map(i => i.temp)
        vm.hum = vm.all.map(i => i.hum)
      })
    }
  }
}
</script>
