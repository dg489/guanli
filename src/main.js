// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/stylus/index.styl'
import axios from 'axios'
import VideoPlay from 'vue-video-player'
import {formatDate} from './common/js/date.js'
import store from './store/store'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VideoPlay)
let bus = new Vue()
Vue.prototype.bus = bus
Vue.prototype.$axios = axios
Vue.prototype.$getime = formatDate
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
