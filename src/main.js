import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 默认无$bus 事件总线Vue实例 做事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)
// 使用懒加载插件
// 将原来img :src -> v-lazy
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png'),
})

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
