import { createStore } from 'vuex'
const KEY = "vite:el:admin:localStorage"

var data = JSON.parse(localStorage.getItem(KEY) || "{}") as State


export default createStore<State>({
  state: {
    cache: data.cache || {}
  },
  getters: {
    cache: (state) => (key: string) => {
      return state.cache[key]
    },
    isAuth(state) {
      return true
    },
    hasRole: state => (role: Role) => {
      return true
    }
  },
  mutations: {
    putCache(state, cache: { key: string, value: string }) {
      state.cache[cache.key] = cache.value
      localStorage.setItem(KEY, JSON.stringify(state))
    },
    clear(state, key: string) {
      switch (key) {
        case "cache": {
          state.cache = {}
          break
        }
        case "all": {
          state = { cache: {} }
          break
        }
      }
      localStorage.setItem(KEY, JSON.stringify(state))
    }
  },
  actions: {
    clearAll() {
      this.commit("clear", "all")
    }
  },
  modules: {
  }
})
