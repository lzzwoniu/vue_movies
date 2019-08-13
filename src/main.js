import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './store'
import axios from "axios"
Vue.config.productionTip = false

// css
import './assets/css/iconfont/iconfont.css';
import './assets/css/common.css'

Vue.prototype.$axios = axios;

Vue.filter('setWH',(url , arg)=>{
  return url.replace(/w\.h/,arg);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
