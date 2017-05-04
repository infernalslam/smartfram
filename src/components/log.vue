<template>
  <div>
    <br><br>
        <nav class="level">
          <div class="level-item has-text-centered">
            <div style="cursor: pointer;" @click="log = '1'">
              <p class="heading">ดู Log</p>
              <p class="title">ระดับอุณหภูมิ</i></p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div style="cursor: pointer;" @click="log = '2'">
              <p class="heading">ดู Log</p>
              <p class="title">ระดับอาหาร</i></p>
            </div>
          </div>
        </nav>

    <table class="table" v-show="log === '1'">
      <thead>
        <tr>
          <th><center><abbr title="Position">Date</abbr></center></th>
          <th><center><abbr title="Goals for">Temperature</abbr></center></th>
          <th><center><abbr title="Goals against">humidity</abbr></center></th>
        </tr>
      </thead>
      <thead>
        <tr v-for="s in db">
          <td><center>{{s.date}}</center></td>
          <td><center>{{s.temp}}</center></td>
          <td><center>{{s.hum}}</center></td>
        </tr>
      </thead>
  </table>


  <table class="table" v-show="log === '2'">
    <thead>
      <tr>
        <th><center><abbr title="Position">Date</abbr></center></th>
        <th><center><abbr title="Goals for">Food</abbr></center></th>
      </tr>
    </thead>
    <thead>
      <tr v-for="s in db2">
        <td><center>{{s.date}}</center></td>
        <td><center>{{s.cm}}</center></td>
      </tr>
    </thead>
</table>




  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'log',
  data () {
    return {
      db: [],
      db2: [],
      log: '1'
    }
  },
  mounted () {
    let vm = this
    vm.getApi()
    setInterval(() => {
      vm.getApi()
    }, 4000)
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
      })
      axios.get('https://smartfarm-1f904.firebaseio.com/feed.json').then((res) => {
        for (var index in res.data) {
          if (res.data.hasOwnProperty(index)) {
            vm.db2.push({
              ...res.data[index],
              id: index
            })
          }
        }
      }).then(() => {
        vm.db2.reverse()
      })
    }
  }
}
</script>
