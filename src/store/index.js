import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      loginStatus: false,
      userInfo: {}
    }
  },
  mutations: {
    updateLoginStatus(state) {
      state.loginStatus = !state.loginStatus
    },
    updateUserInfo(state,payload) {
      state.userInfo = payload
    }
  },
})

export default store