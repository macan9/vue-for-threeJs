import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      loginStatus: false
    }
  },
  mutations: {
    updateLoginStatus(state) {
      state.loginStatus = !state.loginStatus
    }
  },
})

export default store