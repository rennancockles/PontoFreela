export default {
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
