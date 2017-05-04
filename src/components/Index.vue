<template>
  <div>
    <section class="section">
    <div class="container">
      <div class="heading">
        <h1 class="title">ฟาร์มไก่กุ๊กกุ๊ก 🐣</h1>
        <h2 class="subtitle">
          ตำบลเนินหอม อำเภอเมือง จังหวัดปราจีนบุรี<br>
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
        <div class="column button is-success setDis1" :class="{ 'is-loading': loading }">
          <span style="font-size: 55px;">ระดับอาหาร <br> 30% </span> <br>
        </div>
      </div>

    </div>
  </section>

  <log :db="db" :db2="db2" :page="page" />


  </div>
</template>

<script>
/* global moment */
import axios from 'axios'
import Log from './log'
export default {
  name: 'Index',
  data () {
    return {
      date: moment().format('LLL'),
      db: [],
      loading: true,
      turn: 'ON LIGHT',
      toggleLight: true,
      db2: [],
      page: '1'
    }
  },
  mounted () {
    this.getApi()
    let vm = this
    setInterval(() => {
      vm.getApi()
    }, 3000)
  },
  components: {
    Log
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
    },
    food () {
      if (this.db2.length > 0) {
        this.loading = false
        this.db2.reverse()
        return this.db2[0].cm
      } else return 'loading...'
    }
  },
  methods: {
    getApi () {
      let vm = this
      axios.get('https://smartfarm-1f904.firebaseio.com/data.json').then(res => {
        for (var index in res.data) {
          if (res.data.hasOwnProperty(index)) {
            vm.db.push({
              ...res.data[index],
              id: index
            })
          }
        }
      }).then(() => {
        vm.db.reverse()
        axios.get('https://smartfarm-1f904.firebaseio.com/feed.json').then((res) => {
          for (var index in res.data) {
            if (res.data.hasOwnProperty(index)) {
              vm.db2.push({
                ...res.data[index],
                id: index
              })
            }
          }
        })
      }).then(() => {
        vm.db2.reverse()
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
