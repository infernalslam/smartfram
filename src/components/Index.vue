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
          <span style="font-size: 55px;">ระดับอาหาร <br> {{ 100 - food }}% </span> <br>
        </div>
      </div>

    </div>
  </section>

  <log :db="db" :db2="db2" :page="page" />


  </div>
</template>

<script>
/* global moment, Paho */
var config = {
  mqtt_server: 'm12.cloudmqtt.com',
  mqtt_websockets_port: 32441,
  mqtt_user: 'nuuloiub',
  mqtt_password: 'Tb_2kf9fEyzR'
}
var client = new Paho.MQTT.Client(config.mqtt_server, config.mqtt_websockets_port, config.mqtt_user)
client.connect({
  useSSL: true,
  userName: config.mqtt_user,
  password: config.mqtt_password,
  onSuccess: function () {
    console.log('mqtt success')
    client.subscribe('/ESP/LED')
    mqttSend('/ESP/LED', 'GET')
  },
  onFailure: function (e) {
    console.log(e)
  }
})
var mqttSend = function (topic, msg) {
  var message = new Paho.MQTT.Message(msg)
  message.destinationName = topic
  client.send(message)
}
client.onConnectionLost = function (responseObject) {
  if (responseObject.errorCode !== 0) {
    setTimeout(() => {
      client.connect()
    }, 1000)
  }
}
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
        return (this.db2[0].cm / 10) * 100
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
        mqttSend('/ESP/LED', 'LEDON')
        this.toggleLight = false
        this.turn = 'OFF LIGHT'
      } else if (this.turn === 'OFF LIGHT') {
        mqttSend('/ESP/LED', 'LEDOFF')
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
