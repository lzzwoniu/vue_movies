import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './store'

Vue.config.productionTip = false
import './assets/css/iconfont/iconfont.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
