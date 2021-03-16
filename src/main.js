import Vue from 'vue'
import App from './App.vue'
import QuantityCounter from './QuantityCounter.vue'
import PageContent from './PageContent.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component('counter',QuantityCounter)
Vue.component('pagecontent', PageContent)

const myRouter = new VueRouter({
  routes: Routes, 
  mode: 'history'
}); 

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')
