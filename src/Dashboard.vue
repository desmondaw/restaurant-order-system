<template>
  <div>
<ul>
    <li><router-link to="/" exact>Home</router-link></li>
    <li><router-link to="/orders" exact>Orders</router-link></li>
    <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <bc></bc>
    <lc></lc>
  </div>
</template>

<script>
// import {Bar} from 'vue-chartjs'
// import database from "./firebase.js"
import BarChart from './components/charts/BarChart.vue'
import CallAPI from './components/CallAPI.vue'

export default {
    // extends: Bar, 
    components: {
        bc: BarChart, 
        lc: CallAPI
    }, 
  data(){ return {
      allitems: {}, 
      orders: [], 
      testlabel: [], 
      testorders: []
    }
  }, 
  methods: {
      
  }, 
  created() {
      
  }, 
}
</script>

<style scoped>
ul  {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>