import Auth from '@/auth.js'

const actions = {
    setBreadcrumbs ({ commit }, payload) {
        commit('SET_BREADCRUMBS', payload)
    },
    setLoading ({ commit }, payload) {
        commit('SET_LOADING', payload)
    },

    // AUTH
    setIsLoggedIn ({ commit }, payload) {
        commit('SET_IS_LOGGED_IN', payload)
    },
    logIn ({ dispatch }, payload) {
        if (payload && payload.token && payload.user) {
            Auth.setItem('authToken', payload.token)
            Auth.setItem('user', payload.user)

            dispatch('setUser', payload.user)
            dispatch('setIsLoggedIn', true)
        }
    },

    // USER
    setUser ({ commit }, payload) {
        commit('SET_USER', payload)
    },
    updateUser ({ commit }, payload) {
        commit('UPDATE_USER', payload)
    },

    // ACCOUNTS
    setAccounts ({ commit }, payload) {
        commit('SET_ACCOUNTS', payload)
    },
    changeActive ({ commit }, payload) {
        commit('SET_ACTIVE', payload)
    },
    updateAccounts ({ commit }, payload) {
        commit('UPDATE_ACCOUNTS', payload)
    },
    removeAccount ({ commit }, payload) {
        commit('REMOVE_ACCOUNT', payload)
    },

    // REPORTS
    setReports ({ commit }, payload) {
        commit('SET_REPORTS', payload)
    },
    updateReports ({ commit }, payload) {
        commit('UPDATE_REPORTS', payload)
    }
}

export default actions
