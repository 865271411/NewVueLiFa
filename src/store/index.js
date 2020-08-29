import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    setUsername (state, data) {
      console.log('用户名：' + data)
      state.username = data
    }
  },
  actions: {
    
  },
  getters: {
    getUserName (state) {
      console.log('用户名2：' + state.username)
      return state.username
    }
  }
})

export default store