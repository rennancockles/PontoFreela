function fixHourlyRate (account) {
    if (typeof account.hourlyRate === 'number') {
        account.hourlyRate = account.hourlyRate.toFixed(2)
    }
}

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
        if (payload.accounts) payload.accounts.forEach(account => { fixHourlyRate(account) })
        store.user = payload
    },
    UPDATE_USER (store, payload) {
        Object.assign(store.user, payload)
    },

    // ACCOUNTS
    SET_ACCOUNTS (store, payload) {
        payload.forEach(account => { fixHourlyRate(account) })
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
        fixHourlyRate(payload)

        const account = store.user.accounts.find(account => account.id === payload.id)

        if (account) Object.assign(account || {}, payload)
        else store.user.accounts.push(payload)
    },
    REMOVE_ACCOUNT (store, payload) {
        const accounts = store.user.accounts.filter(account => account.id !== payload.id)

        this.commit('SET_ACCOUNTS', accounts)
    },

    // REPORTS
    SET_REPORTS (store, payload) {
        const activeAccount = store.user.accounts.find(account => account.active)
        activeAccount.reports = payload
    },
    UPDATE_REPORTS (store, payload, getters) {
        const activeAccount = store.user.accounts.find(account => account.active)
        const report = activeAccount.reports.find(report => report.id === payload.id)

        if (report) Object.assign(report || {}, payload)
        else activeAccount.reports.push(payload)
    }
}

export default mutations
