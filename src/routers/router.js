import Vue from 'vue'
import Router from 'vue-router'
import Moives from './moives_router/moives_router'
import Cinema from './cinema_router/cinema_router'
import My from './my_router/my_router'

Vue.use(Router)

export default new Router({
  routes: [
    Moives,
    Cinema,
    My
  ]
})
