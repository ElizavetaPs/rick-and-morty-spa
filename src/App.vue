<template>
  <div id="app">
    <div class="bg-purple-800 p-3 flex justify-center items-center">
        <a>
            <img class="h-16" src="./assets/logo.png" alt="Sunset in the mountains">
        </a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
