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
        <div class="column button is-primary" :class="{ 'is-loading': loading }" style="font-size: 30px; text-align: center;"> {{temp}} °C
        </div>
        <div class="column">
          <h1 style="font-size: 30px; text-align: center;">{{ hum }} %</h1>
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
      loading: true
    }
  },
  mounted () {
    this.getApi()
    let vm = this
    setInterval(() => {
      vm.getApi()
    }, 1000)
  },
  computed: {
    temp () {
      if (this.db.length > 0) {
        this.loading = false
        return this.db[this.db.length - 1].temp
      } else return 'loading...'
    },
    hum () {
      if (this.db.length > 0) {
        return this.db[this.db.length - 1].hum
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
        console.log(vm.db)
      })
    }
  }
}
</script>
