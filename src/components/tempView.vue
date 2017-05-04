<template>
  <div>
    <section class="section">
      <div class="columns">
        <div class="column" style="background: red;">
          <linear-gauge :value="value"></linear-gauge>
        </div>
        <!-- <div class="column" style="background: yellow;"></div> -->
      </div>
    </section>
  </div>
</template>

<script>
import LinearGauge from '../../node_modules/vue-canvas-gauges/src/LinearGauge.vue'
// import RadialGauge from '../../node_modules/vue-canvas-gauges/src/RadialGauge.vue'
export default {
  name: 'tempView',
  data () {
    return {
      value: 40,
      num: '233'
    }
  },
  components: {
    LinearGauge
  }
}
</script>
