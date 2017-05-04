<template>
  <div>
    <table class="table">
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

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'log',
  data () {
    return {
      db: []
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
