<template>
  <div id="app">
    <header-view />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderView from './components/Header'
export default {
  name: 'app',
  components: {
    HeaderView
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Prompt');
* {
  font-family: 'Prompt', sans-serif;
}
</style>
