import Vue from 'vue'
import App from './App.vue'
import router from "./router"

Vue.config.productionTip = false
//Add unimported components to ignore list to prevent warnings.
Vue.config.ignoredElements = ['field', 'block', 'category', 'xml', 'mutation', 'value', 'sep']

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
