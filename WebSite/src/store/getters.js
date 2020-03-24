import Auth from '@/auth.js'

const getters = {
    breadcrumbs (state) {
        return state.breadcrumbs
    },
    loading (state) {
        return state.loading
    },

    // AUTH
    authToken () {
        return Auth.getToken()
    },
    isLoggedIn (state) {
        return state.isLoggedIn
    },

    // USER
    user (state) {
        return state.user
    },
    name (state) {
        return state.user.name
    },

    // ACCOUNTS
    accounts (state) {
        return state.user.accounts
    },
    activeAccount (state) {
        return state.user.accounts.find(account => account.active)
    }
}

export default getters
