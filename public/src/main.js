import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMoment from 'vue-moment'
import moment from 'moment'

Vue.config.productionTip = false;
Vue.use(VueMoment,{
  moment
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
