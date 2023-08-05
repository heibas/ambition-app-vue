// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Toast } from 'vant';
import 'vant/lib/index.css';
import '@/assets/style.css'
Vue.config.productionTip = false
Vue.prototype.$api = '/api';
Vue.prototype.$store = store;
Vue.use(Vant)
Vue.use(Toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
