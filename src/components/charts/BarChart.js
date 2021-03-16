import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "quantity",
                backgroundColor: ['blue', 'purple', 'green','brown','red','yellow'],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }, 
        allitems: {}, 
        orders: []
    }
  },
  methods: {
    fetchItems: function() {
        database.collection('menu').get().then((querySnapShot)=>{ 
        let item={};
        querySnapShot.forEach(doc=>{ 
          item=doc.data(); 
          this.allitems[item.name] = 0;      
        }) })
        //   console.log(this.allitems); 
        database.collection('orders').get().then((querySnapShot)=>{ 
        querySnapShot.forEach(doc=>{ 
           this.orders.push(doc.data());
        //    console.log(this.orders.length)
        }) }).then(()=>{        
            for (let i = 0; i < this.orders.length; i++) {
            var item = this.orders[i]; 
            // console.log(this.orders[i]); 
            for (var [key, value] of Object.entries(item)) {
                this.allitems[key] = this.allitems[key]+value; 
            }
        }
        }).then(()=> {
            for (const [key, value] of Object.entries(this.allitems)) {
                this.datacollection.labels.push(key); 
                this.datacollection.datasets[0].data.push(value); 
            }
            this.renderChart(this.datacollection, this.options); 
        })
        console.log(this.allitems); 
        
      }
  },
  created () {
    this.fetchItems()
  }
}