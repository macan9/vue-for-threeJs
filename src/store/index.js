import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
})

export default store