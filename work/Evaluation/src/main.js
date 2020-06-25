import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import store from '@/store'
// import AsyncComputed from 'vue-async-computed'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
import './axios'

// import api from '@/service/api'

import Vuex from 'vuex'

// Vue.use(VueAxios, axios)
Vue.use(ElementUI)

// Vue.use(AsyncComputed)

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')