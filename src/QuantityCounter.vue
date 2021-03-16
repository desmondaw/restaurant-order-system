<template>
  <div>
  <button v-on:click = 'inc()'>+</button>
  {{counter}}
  <button v-on:click = "dec()">-</button>
  </div>
</template>

<script scoped>
export default {
    data(){ return {
    counter : 0 }
  }, 
  methods: {
      inc:function(){
        if (this.counter == 10) {
          alert("You cannot buy more than 10 items."); 
          } else {
            this.counter++; 
            console.log("inc invoked");
            // document.getElementById("cnt").innerHTML = this.counter; 
            }
            this.$emit('counter', this.item, this.counter); 
      }, 
      dec:function(){
        if (this.counter != 0) {
          this.counter--; 
          // document.getElementById("cnt").innerHTML = this.counter; 
          }
           this.$emit('counter', this.item, this.counter); 
      }
  }, 
  props: {
    item: {
        type: Object
      }
  }

}
</script>

<style>

</style>