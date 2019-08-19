import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './stores/store'
import axios from "axios"
Vue.config.productionTip = false

// css
import './assets/css/iconfont/iconfont.css';
import './assets/css/common.css'

Vue.prototype.$axios = axios;

Vue.filter('setWH',(url , arg)=>{
  return url.replace(/w\.h/,arg);
});

// scroll
import BScroll from '@/components/bscroll/bscroll';
Vue.component("BScroll", BScroll)

// loading
import Loading from '@/components/loading/loading';
Vue.component("Loading", Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
