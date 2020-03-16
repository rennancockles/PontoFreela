export default {
    state: {
        record: {
            date: '',
            obs: '',
            times: []
        }
    },
    getters: {
        record (state) {
            return state.record
        },
        recordTime: (state) => (index) => {
            return state.record.times[index]
        }
    },
    mutations: {
        ADD_TIME (store, time) {
            store.record.times.push(time)
        },
        REMOVE_TIME (store, index) {
            store.record.times.splice(index, 1)
        },
        SET_RECORD_TIME (store, payload) {
            store.record.times[payload.index] = payload.value
        }
    },
    actions: {
        addTime ({ commit }, time) {
            commit('ADD_TIME', time)
        },
        removeTime ({ commit }, index) {
            commit('REMOVE_TIME', index)
        },
        setRecordTime ({ commit }, payload) {
            commit('SET_RECORD_TIME', payload)
        }
    }
}
