import Vue from 'nativescript-vue'
import RadCalendarPlugin from 'nativescript-ui-calendar/vue';
// import VueDevtools from 'nativescript-vue-devtools'

import routes from '~/router'
import store from '~/store'
import sideDrawer from '~/components/sideDrawer'
import drawerContent from '~/components/drawerContent'
import api from "./system/api";

// if(TNS_ENV !== 'production') {
//   Vue.use(VueDevtools)
// }

// Prints Vue logs when --env.production is *NOT* set while building
// Vue.config.silent = (TNS_ENV === 'production')
// Vue.config.silent = true;

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.use(RadCalendarPlugin);

// const api = new Api();

Vue.prototype.$api = api;
Vue.prototype.$routes = routes

// new Vue({

//   render: h => h('frame', [h(routes.Home)])

// }).$start();

new Vue({
  store,
  render (h) {
    return h(
      sideDrawer,
      [
        h(drawerContent, { slot: 'drawerContent' }),
        h(api.isLoggedIn() ? routes.Home : routes.Login, { slot: 'mainContent' })
      ]
    )
  },
  created(){
    api.$vue = this;
  }
}).$start()
