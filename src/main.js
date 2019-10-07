import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import 'buefy/dist/buefy.css';
import '@mdi/font/css/materialdesignicons.css';

import router from './router/router';


Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
