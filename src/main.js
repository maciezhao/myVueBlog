import Vue from 'vue'

import ElementUI from 'element-ui'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
//import 'element-ui/lib/theme-chalk/index.css'
//import '@/theme/green/theme/index.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
import '@/assets/icons/iconfont.css' // icon
import App from './App'
import router from './router'
import store from './store'

import VueResource from 'vue-resource'
import {formatTime} from "./utils/time";
import '@/permission' // permission control

Vue.use(ElementUI)

Vue.use(VueResource)

Vue.config.productionTip = false

// 格式化时间
Vue.filter('format', formatTime)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})

Vue.config.devtools = true;