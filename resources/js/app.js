/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
// window.Vue = require('vue');

import Vue from "vue";
import App from "./app/App";
import {store} from './app/store';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
/* import the fontawesome core */
import { fas} from '@fortawesome/free-solid-svg-icons';
import { fab} from '@fortawesome/free-brands-svg-icons';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import router from "./app/routes";
/* add icons to the library */
library.add(fas,fab)

/* add font awesome icon component */
Vue.component('fa', FontAwesomeIcon)
Vue.component('v-select', vSelect)
Vue.use(BootstrapVue);


const app = new Vue({
    el: '#app',
    router:router,
    store:store,
    render:app=>app(App)
});

export default router;
