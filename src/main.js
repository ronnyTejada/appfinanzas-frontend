import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification'
import store from "./store";
import router from "./router"
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))



Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
