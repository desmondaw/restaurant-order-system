<template>
  <div>
  
      Basket: <br>
      <ul>
          <li v-for = "x in itemsSelected" :key="x[0]">
              {{x[0]}} x {{x[1]}}
          </li>

  </ul><br>
  <!-- <button v-on:click="findTotal">Calculate Total</button><br> -->
  <button v-on:click="sendOrder">Send order</button><br>
  <!-- <div>Subtotal: </div><div v-if="this.clicked">${{findTotal()}}</div> -->
  <!-- Grand Total: <div v-if="this.clicked">${{findGrandTotal}} <br></div> -->
  </div>
</template>

<script scoped>
import database from './firebase.js'

export default {
  data(){ return {
      clicked : false, 
      subtotal: 0
      }
  }, 
  props: {
      itemsSelected: {
        type: Array
      }, 
      allitems: {
          type: Object
      }
    },
    methods: {
        findTotal: function() {
            var total = 0; 
            this.clicked = true; 
            this.itemsSelected.forEach(x=> total += x[1]*x[2]); 
            this.subtotal = total; 
            return total; 
        }, 
        sendOrder: function() {
            // var dict = {}; 
            console.log("yyy " + this.allitems);
            this.itemsSelected.forEach(x=> {
                this.allitems[x[0]] = x[1];         
            }); 
            database.collection('orders').add(this.allitems).then(
                ()=>
                    {location.reload()})
                    // console.log(dict);
        }
    }, 
    computed: {
        findGrandTotal: function() {
            return +(this.subtotal * 1.07).toFixed(2); 
        }
    }

}
</script>

<style>

</style>