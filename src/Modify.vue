<template>
  <div>
      <ul>
          <li v-for="(k,v,i) in datapacket" v-bind:key="(k,v).id">
              {{v}}:{{k}}<br>
              <p><input v-bind:id=i placeholder=0 type="number" min="0" max="10"></p>
          </li>
      </ul>
      <button v-on:click="updateOrder">Update Order</button>
  </div>
</template>

<script>
import database from "./firebase.js"

export default {
  data(){ return {
      datapacket: {
          type: Object
      }
    }
  }, 
  methods: {
    fetchItems: function() {
       let doc_id = this.$route.params.doc_id; 
       console.log('CALLED!'+doc_id); 
        database.collection('orders').doc(doc_id).get().then( (doc) => (
            this.datapacket = doc.data()
        )
        );
        console.log(this.datapacket) 
    }, 
    updateOrder: function() {
        let doc_id = this.$route.params.doc_id;
        let dp_copy = {...this.datapacket}; 
        var inputs = document.getElementsByTagName('input'); 
        for (var i = 0; i<inputs.length; i++) {
            let input = inputs[i]; 
            if (input.value === "") {
                continue; 
            } else if (input.value<0 || input.value>10) {
                alert("items qty must be between 0 and 10"); 
                break; 
            }
            else {
                dp_copy[Object.keys(dp_copy)[input.id]] = parseInt(input.value);
            }
        }
        console.log(dp_copy);
        database.collection('orders').doc(doc_id).set(dp_copy).then(
            () => this.$router.push('/orders')
        ); 
    }
  },  
  created: function() {
      this.fetchItems(); 
    } 
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>