const mutations = {
    SET_BREADCRUMBS (store, payload) {
        store.breadcrumbs = payload
    },
    SET_LOADING (store, payload) {
        store.loading = payload
    },

    // AUTH
    SET_IS_LOGGED_IN (store, payload) {
        store.isLoggedIn = payload
    },

    // USER
    SET_USER (store, payload) {
        store.user = payload
    },

    // ACCOUNTS
    SET_ACCOUNTS (store, payload) {
        payload.forEach(account => {
            if (typeof account.hourlyRate === 'number') {
                account.hourlyRate = account.hourlyRate.toFixed(2)
            }
        })
        store.user.accounts = payload
    },
    SET_ACTIVE (store, payload) {
        const account = store.user.accounts.find(account => account.id === payload.id)

        if (account) {
            store.user.accounts.forEach(account => { account.active = false })
            account.active = true
        }
    },
    UPDATE_ACCOUNTS (store, payload) {
        const accounts = store.user.accounts.filter(account => account.id !== payload.id)
        accounts.push(payload)

        this.commit('SET_ACCOUNTS', accounts)
    },
    REMOVE_ACCOUNT (store, payload) {
        const accounts = store.user.accounts.filter(account => account.id !== payload.id)

        this.commit('SET_ACCOUNTS', accounts)
    }
}

export default mutations
