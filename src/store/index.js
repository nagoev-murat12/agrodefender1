import Vue from 'vue'
import Vuex from 'vuex'
import axios  from 'axios';
import { auth } from './auth.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [
    { id: 1, name: 'tete1', role: 'admin' },
    { id: 2, name: 'User2', role: 'user' },
    { id: 3, name: 'User3', role: 'user' },
    ]
  },
  getters: {
    userData: state => state.user,
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },
    
    getUsersByRole: (state) => (role) => {
      return state.users.filter(user => user.role === role)
    }
  
  },
  mutations: {
    set_user_data(state, paylaod) {
    state.user = paylaod;
   }
  },
  actions: {
    getUserData ({commit}, payload) {
      const { user } = payload;
      return axios.get({ url: "http://31.41.63.47:4200/", params: {id: user.id, } })
      .then( resp => {
        // условное получение данных
        commit('set_user_data', resp.data);
      })
   }
  },
  modules: {
    auth
  }
})
