import Vue from 'vue'
import Vuex from 'vuex'
import actions from "@/store/actions";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [],
    actions
  },
  mutations: {

  },
  actions,

  modules: {}
})
