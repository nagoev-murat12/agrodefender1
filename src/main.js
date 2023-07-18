import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import  Axios  from "axios";
import Vuex from 'vuex';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VeeValidate from "vee-validate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import VueRouterUserRoles from "vue-router-user-roles";
import VueCookie from 'vue-cookie'
import 'bulma/css/bulma.css';



library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

Vue.use(VueRouterUserRoles, { router });
Vue.use(Vuex);
Vue.use(VueCookie )

Vue.use(VeeValidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
