<template>
  <div> 
      <div id = "itemsList"> 
        <ul>
    <li><router-link to="/" exact>Home</router-link></li>
    <li><router-link to="/orders" exact>Orders</router-link></li>
    <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
      <ul>
          <li v-for = "x in items" v-bind:key="x.id">
              <div id="itemName">{{x.name}}<br></div>
              <img v-bind:src=x.imageURL><br>
              <div id="price"> ${{x.price}} </div>
              <qtyctr v-on:counter="onCounter" v-bind:item = "x" ></qtyctr>
          </li>
  </ul>
  </div>
    <div id="shoppingBasket">
      <basket id="shoppingBasket" v-bind:itemsSelected = "itemsSelected" v-bind:allitems="allitems"></basket> 
    </div>
  </div>
</template>

<script scoped>
import Basket from './Basket.vue'
import QuantityCounter from './QuantityCounter.vue'
import Vue from 'vue'
import database from "./firebase.js"

var uniqueDishes = new Set([]); 
export default {
  data(){ return {
    itemsSelected : [], 
    items: [], 
    allitems: {}
    }
  }, 
    methods: {
      onCounter: function(item, count) {
        
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
        uniqueDishes.add(item.name); 
      } else if (count > 0) {

          if (!uniqueDishes.has(item.name) && count>0) {
            this.itemsSelected.push([item.name, count, item.price]);
            uniqueDishes.add(item.name); 

          } else if (uniqueDishes.has(item.name) && count>0) {
            for (let i = 0; i < this.itemsSelected.length; i++) {
              const curr_item = this.itemsSelected[i];
              const item_name = curr_item[0]; 
              if (item_name == item.name) {
                curr_item[1] = count;
                Vue.set(this.itemsSelected, i, curr_item); 
                break;
              }
            } 
          }
      } else if (uniqueDishes.has(item.name) && count===0) {
        uniqueDishes.delete(item.name); 
        var index; 
        for (let i = 0; i < this.itemsSelected.length; i++) {
              const curr_item = this.itemsSelected[i];
              const item_name = curr_item[0]; 
              if (item_name == item.name) {
                index = i; 
              }
        }
        this.itemsSelected.splice(index,1); 
        //this.itemsSelected.splice(index, 1, newValue)
      }


          // // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          // if (item_name === item.name && count>0) {
          //   curr_item[1] = count; 

          // } 
          // // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          
          // // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
          // else if (item_name != item.name) {
          //   this.itemsSelected.push([item.name, count, item.price]);
          // }
          
        
        //var uniques = new Set(this.itemsSelected); 
        
        
        //console.log("in this set: ")
        //uniques.forEach(a=> console.log(a)); 
      console.log("else clause: " + this.itemsSelected); 
      console.log("set contains: "); 
      // uniqueDishes.forEach(a=> console.log(a)); 
    }, 

    fetchItems: function() {
      database.collection('menu').get().then((querySnapShot)=>{ 
        let item={};
        querySnapShot.forEach(doc=>{ 
          item=doc.data(); 
          // console.log("executed: "+item); 
          this.allitems[item.name] = 0; 
          this.items.push(item); 
          
        }) })
        console.log(this.allitems);
         }, 

    
        
    }, 
    created: function() {
      this.fetchItems(); 
    }, 
    components: {
      'basket':Basket, 
      'qtyctr':QuantityCounter,  
    }


}
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}


</style>