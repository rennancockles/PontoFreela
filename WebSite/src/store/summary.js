export default {
    state: {
        time: 0,
        money: 0
    },
    getters: {
        time (state) {
            return state.time
        },
        money (state) {
            return state.money
        }
    },
    mutations: {
        SET_TIME (store, payload) {
            store.time = payload
        },
        SET_MONEY (store, payload) {
            store.money = payload
        }
    },
    actions: {
        setTime ({ commit }, payload) {
            commit('SET_TIME', payload)
        },
        setMoney ({ commit }, payload) {
            commit('SET_MONEY', payload)
        }
    }
}
