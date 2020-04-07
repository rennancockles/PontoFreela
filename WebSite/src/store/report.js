export default {
    state: {
        report: {
            id: null,
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
        CLEAR_REPORT (store) {
            store.report = {
                id: null,
                date: '',
                obs: '',
                records: []
            }
        },
        SET_REPORT (store, { id, date, obs, records }) {
            records.forEach(rec => { rec.time = rec.timeFormatted })
            store.report = { id, date, obs, records }
        },
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
        clearReport ({ commit }) {
            commit('CLEAR_REPORT')
        },
        setReport ({ commit }, payload) {
            commit('SET_REPORT', payload)
        },
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
