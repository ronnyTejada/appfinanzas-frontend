import Vue from 'vue'
import VueRouter from "vue-router"
import Shop from '../components/Shop.vue'
import InvetarioForm from '../components/InventarioForm.vue'
import HistoryVentas from '../components/HistoryVentas.vue'
import Statistics from '../components/Statistics.vue'


Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'Shop',
        component:Shop
    },
    {
        path:'/inventarioForm',
        name:'InvetarioForm',
        component:InvetarioForm
    },
    {
        path:'/historialVentas',
        name:'HistorialVentas',
        component:HistoryVentas
    },
    {
        path:'/Statistics',
        name:'Statistics',
        component:Statistics

    }
]

const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
})

export default router;