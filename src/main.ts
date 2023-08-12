import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuex from 'vuex'
import storeConfigs from "./store";

export const EventBus = new Vue();

Vue.config.productionTip = false;

Vue.use(Vuex)
const store = new Vuex.Store(storeConfigs); 

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
