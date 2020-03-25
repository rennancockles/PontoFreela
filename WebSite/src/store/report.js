export default {
    state: {
        report: {
            date: '',
            obs: '',
            records: []
        }
    },
    getters: {
        report (state) {
            return state.report
        },
        record: (state) => (index) => {
            return state.report.records[index]
        },
        records (state) {
            return state.report.records
        }
    },
    mutations: {
        ADD_RECORD (store, time) {
            store.report.records.push({ id: null, time })
        },
        REMOVE_RECORD (store, index) {
            store.report.records.splice(index, 1)
        },
        UPDATE_RECORD (store, payload) {
            store.report.records[payload.index] = { id: payload.id, time: payload.time }
        }
    },
    actions: {
        addRecord ({ commit }, time) {
            commit('ADD_RECORD', time)
        },
        removeRecord ({ commit }, index) {
            commit('REMOVE_RECORD', index)
        },
        updateRecord ({ commit }, payload) {
            commit('UPDATE_RECORD', payload)
        }
    }
}
