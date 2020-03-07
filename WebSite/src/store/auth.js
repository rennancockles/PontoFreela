import Auth from '@/auth.js'

export default {
    state: {
        isLoggedIn: false
    },
    getters: {
        authToken () {
            return Auth.getToken()
        },
        isLoggedIn (state) {
            return state.isLoggedIn
        }
    },
    mutations: {
        SET_IS_LOGGED_IN (store, payload) {
            store.isLoggedIn = payload
        }
    },
    actions: {
        setIsLoggedIn ({ commit }, payload) {
            commit('SET_IS_LOGGED_IN', payload)
        },
        logIn ({ dispatch }, payload) {
            if (payload && payload.token && payload.user) {
                Auth.setItem('authToken', payload.token)
                Auth.setItem('user', payload.user)
                Auth.setItem('accounts', payload.accounts)

                dispatch('setUser', payload.user)
                dispatch('setAccounts', payload.accounts)
                dispatch('setIsLoggedIn', true)
            }
        }
    }
}
