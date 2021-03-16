<template>
  <div>
    <ul>
    <li><router-link to="/" exact>Home</router-link></li>
    <li><router-link to="/orders" exact>Orders</router-link></li>
    <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <ul>
          <li v-for = "x in orders" v-bind:key="x.id">
              <p class="itemlist"  v-for = "(k,v) in x[1]" v-bind:key="(k,v).id">
                {{v}}: {{k}}            
              </p>
              <button v-bind:id="x[0]" v-on:click="route($event)">Modify</button>
              <button v-bind:id="x[0]" v-on:click="deleteItem($event)">Delete</button>
          </li>
    </ul>
  </div>
</template>

<script>
import database from "./firebase.js"
// import PageContent from './PageContent.vue'
export default {
  data(){ return {
      orders: []
    }
  }, 
  methods: {
    fetchItems: function() {
      database.collection('orders').get().then((querySnapShot)=>{ 
        let item={};
        querySnapShot.forEach(doc=>{ 
          item=doc.data(); 
          // console.log("executed: "+item); 
           this.orders.push([ doc.id, item]);
        }) }) 
        console.log(this.orders);
        }, 
     deleteItem: function(event) {
         let doc_id = event.target.getAttribute("id"); 
         console.log(doc_id);
         database.collection('orders').doc(doc_id).delete().then(()=>location.reload());
     }, 
    route: function(event) {
        let doc_id = event.target.getAttribute("id"); 
        // console.log("modified: "+doc_id); 
        this.$router.push({ name: 'modify', params: { doc_id: doc_id } })
    }
  }, 
  created: function() {
      this.fetchItems(); 
    }
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

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>