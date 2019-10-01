import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';


Vue.config.productionTip = false;

Vue.use(Buefy);

import router from './router/router';

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

