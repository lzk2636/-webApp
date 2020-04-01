import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/icon.css'
import './styles/base.css'
import '@/filters/formTime'
Vue.use(Vant)
Vue.config.productionTip = false
import './utils/http'
console.log(process.env)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
