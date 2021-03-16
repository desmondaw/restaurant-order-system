import PageContent from './PageContent.vue'
import Orders from './Orders.vue'
import Modify from './Modify.vue'
import Dashboard from './Dashboard.vue'

export default [
    { path: '/', component: PageContent }, 
    { path: '/orders', component: Orders },
    { path: '/modify', component: Modify, name:'modify', props:true }, 
    { path: '/dashboard', component: Dashboard, props:true }
]