import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import Vuex from 'vuex';

import {getStore, LocalStore} from '@/domain/services/store';
import {getRouter} from '@/router';
import Vuetify from 'vuetify';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Vuetify);


Vue.config.productionTip = false;

const router = getRouter();
const store: LocalStore = getStore();
Vue.prototype.$store = store;

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app'); 
