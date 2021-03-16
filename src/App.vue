<template>
  <div id="app">
    <h1>WHATS UP MY DUDE</h1>
    <router-view></router-view>
  </div>
</template>

<script>
// import PageContent from './PageContent.vue'
export default {
  data(){ return {
    }
  }, 
  components: {
    // PageContent
  }
}
</script>

<style>
h1 {
  background-color: red;
  text-align: center;
  color: white;
}
</style>