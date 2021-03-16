import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                label: 'central', 
                data: [],
                backgroundColor: 'red', 
                borderColor: 'red', 
                fill: false
            }, { 
              label: 'west', 
              data: [],
              backgroundColor: 'blue', 
              borderColor: 'blue', 
              fill: false
          }, 
          { 
            label: 'east', 
            data: [],
            backgroundColor: 'green', 
            borderColor: 'green', 
            fill: false
        }, 
        { 
          label: 'north', 
          data: [],
          backgroundColor: 'violet', 
          borderColor: 'violet', 
          fill: false
      }, 
      { 
        label: 'south', 
        data: [],
        backgroundColor: 'orange', 
        borderColor: 'orange', 
        fill: false
    }
          ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: ''
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data.items.forEach(data => { 
                this.datacollection.labels.push(data.timestamp); 
                this.datacollection.datasets[0].data.push(data.readings.psi_twenty_four_hourly.central); 
                this.datacollection.datasets[1].data.push(data.readings.psi_twenty_four_hourly.west); 
                this.datacollection.datasets[2].data.push(data.readings.psi_twenty_four_hourly.east);
                this.datacollection.datasets[3].data.push(data.readings.psi_twenty_four_hourly.north);
                this.datacollection.datasets[4].data.push(data.readings.psi_twenty_four_hourly.south);
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}