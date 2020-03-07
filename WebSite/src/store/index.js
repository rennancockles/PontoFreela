import Vue from 'vue'
import Vuex from 'vuex'

import accountsStore from './accounts.js'
import authStore from './auth.js'
import summaryStore from './summary.js'
import userStore from './user.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        breadcrumbs: [],
        loading: false
    },
    getters: {
        breadcrumbs (state) {
            return state.breadcrumbs
        },
        loading (state) {
            return state.loading
        }
    },
    mutations: {
        SET_BREADCRUMBS (store, payload) {
            store.breadcrumbs = payload
        },
        SET_LOADING (store, payload) {
            store.loading = payload
        }
    },
    actions: {
        setBreadcrumbs ({ commit }, payload) {
            commit('SET_BREADCRUMBS', payload)
        },
        setLoading ({ commit }, payload) {
            commit('SET_LOADING', payload)
        }
    },
    modules: {
        accountsStore,
        authStore,
        summaryStore,
        userStore
    }
})
