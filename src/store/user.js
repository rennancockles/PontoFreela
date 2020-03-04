export default {
    state: {
        user: {}
    },
    getters: {
        user (state) {
            return state.user
        },
        name (state) {
            return state.user.name
        }
    },
    mutations: {
        SET_USER (store, payload) {
            store.user = payload
        }
    },
    actions: {
        setUser ({ commit }, payload) {
            commit('SET_USER', payload)
        }
    }
}
