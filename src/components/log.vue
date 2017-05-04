<template>
  <div>
    <br><br>
        <nav class="level">
          <div class="level-item has-text-centered">
            <div style="cursor: pointer;" @click="page = '1'">
              <p class="heading">ดู Log</p>
              <p class="title">ระดับอุณหภูมิ</i></p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div style="cursor: pointer;" @click="page = '2'">
              <p class="heading">ดู Log</p>
              <p class="title">ระดับอาหาร</i></p>
            </div>
          </div>
        </nav>

    <table class="table" v-show="page === '1'">
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


  <table class="table" v-show="page === '2'">
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
export default {
  name: 'log',
  props: ['db', 'db2', 'page']
}
</script>
