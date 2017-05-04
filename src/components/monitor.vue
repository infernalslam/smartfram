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
      all: [],
      date: []
    }
  },
  mounted () {
    let vm = this
    this.getData()
    setInterval(() => {
      vm.getData()
    }, 3000)
  },
  methods: {
    getChart () {
      var ctx = document.getElementById('myChart')
      var data = {
        labels: this.date,
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
      let arr = []
      axios.get('https://smartfarm-1f904.firebaseio.com/data.json').then((res) => {
        for (var index in res.data) {
          if (res.data.hasOwnProperty(index)) {
            arr.push(res.data[index])
          }
        }
        vm.all = arr
        vm.temp = vm.all.map(i => i.temp)
        vm.hum = vm.all.map(i => i.hum)
        vm.date = vm.all.map(i => i.date)
        vm.getChart()
      })
    }
  }
}
</script>
