import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Stats.vue'),
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: () => import('@/pages/Changelog.vue'),
    },
    {
      path: '/tops',
      name: 'tops',
      component: () => import('@/pages/Tops.vue'),
    },
  ],
});
