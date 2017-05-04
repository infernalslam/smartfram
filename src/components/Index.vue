<template>
  <div>
    <section class="section">
    <div class="container">
      <div class="heading">
        <h1 class="title">smartfarm-1f904</h1>
        <h2 class="subtitle">
          ตำบล เนินหอม อำเภอเมืองปราจีนบุรี ปราจีนบุรี <br>
          <strong>{{date}}</strong>
        </h2>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">

      <div class="columns">
        <div class="column is-11"></div>
        <div class="column">
          <a class="button is-outlined" :class="{'is-danger': toggleLight }" @click="turnLight()">{{turn}}</a>
        </div>
      </div>

      <div class="columns">
        <div class="column button is-primary setDis1" :class="{ 'is-loading': loading }" style="font-size: 55px; text-align: center;">
          <span> อุณหภูมิ <br> {{temp}} °C </span>
        </div>
          <div class="column button is-danger setDis2" :class="{ 'is-loading': loading }" style="font-size: 55px; text-align: center;">
          <span> ความชื้น <br> {{hum}} % </span>
        </div>
      </div>

      <div class="columns">
        <div class="column button is-success setDis1">
          <span style="font-size: 55px;">ระดับอาหาร <br> 30% </span> <br>
          <progress class="progress is-danger" value="30" max="100"></progress>
        </div>
      </div>

    </div>
  </section>


  </div>
</template>

<script>
/* global moment */
import axios from 'axios'
export default {
  name: 'Index',
  data () {
    return {
      date: moment().format('LLL'),
      db: [],
      loading: true,
      turn: 'ON LIGHT',
      toggleLight: true
    }
  },
  mounted () {
    this.getApi()
    let vm = this
    setInterval(() => {
      vm.getApi()
    }, 10000)
  },
  computed: {
    temp () {
      if (this.db.length > 0) {
        this.loading = false
        this.db.reverse()
        return this.db[0].temp
      } else return 'loading...'
    },
    hum () {
      if (this.db.length > 0) {
        this.loading = false
        this.db.reverse()
        return this.db[0].hum
      } else return 'loading...'
    }
  },
  methods: {
    getApi () {
      let vm = this
      let arr = []
      axios.get('https://smartfarm-1f904.firebaseio.com/data.json').then(res => {
        for (var index in res.data) {
          if (res.data.hasOwnProperty(index)) {
            arr.push({
              ...res.data[index],
              id: index
            })
          }
        }
      }).then(() => {
        vm.db = arr
      })
    },
    turnLight () {
      if (this.turn === 'ON LIGHT') {
        this.toggleLight = false
        this.turn = 'OFF LIGHT'
      } else if (this.turn === 'OFF LIGHT') {
        this.toggleLight = true
        this.turn = 'ON LIGHT'
      }
    }
  }
}
</script>

<style>
.setDis1 {
  position: relative;
  height: 35vh;
}
.setDis2 {
  position: relative;
  height: 35vh;
}
.setDis3 {
  position: relative;
  height: 25vh;
}
</style>
