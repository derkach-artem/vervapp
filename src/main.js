import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VeeValidate from 'vee-validate';

import {store} from './store/';

Vue
  .use(Vuetify)
  .use(VeeValidate);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
