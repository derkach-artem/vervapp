import Vue from 'vue';
import Vuex from 'vuex';
import mainModule from './modules/mainModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        mainModule,
    }
});