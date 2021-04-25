import Vue from 'vue'
import VueRouter from "vue-router"
import Shop from '../components/Shop.vue'
import InvetarioForm from '../components/InventarioForm.vue'
import HistoryVentas from '../components/HistoryVentas.vue'
import Statistics from '../components/Statistics.vue'
import SignUp from '../components/SignUp.vue'
import store from "../store";
import LoginUser from "../components/Login.vue"
import Deudas from "../components/Deudas.vue"


Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'Shop',
        component:Shop,
        meta:{
            auth:true
          }
    },
    {
        path:'/inventarioForm',
        name:'InvetarioForm',
        component:InvetarioForm,
        meta:{
            auth:true
          }
    },
    {
        path:'/historialVentas',
        name:'HistorialVentas',
        component:HistoryVentas,
        meta:{
            auth:true
          }
    },
    {
        path:'/Statistics',
        name:'Statistics',
        component:Statistics,
        meta:{
            auth:true
          }

    },
    {
      path:'/deudas',
      name:'Deudas',
      component:Deudas,
      meta:{
          auth:true
        }

  },
    {
        path:'/signup',
        name:'SignUp',
        component:SignUp

    },
    {
        path:'/login',
        name:'login',
        component:LoginUser
      }
]

const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next)=>{
    let userlogged = store.getters.isUserLogged
    let auth = to.matched.some(record => record.meta.auth)
    console.log(userlogged)
    if(auth && !userlogged){
      next('/login')
    }else if(!auth && userlogged){
      next('/')
    }else{
      next()
    }
    
  })

export default router;