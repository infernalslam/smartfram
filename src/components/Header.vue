<template>
  <div>
    <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <router-link class="nav-item" to="/"><strong>#SmartFarm</strong></router-link>
        <router-link class="nav-item" to="/monitor"><strong>Monitor</strong></router-link>
        <router-link class="nav-item" to="/showGraph"><strong>Log</strong></router-link>
      </div>
    </div>
</nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  }
}
</script>
