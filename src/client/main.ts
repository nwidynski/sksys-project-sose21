import Vue from "vue";
import App from "./App.vue";
import router from './router';

Vue.config.productionTip = false;

//Auth
let store = {
  user: undefined
}

new Vue({
  data: store,
  router,
  render: (h) => h(App),
}).$mount("#app");
