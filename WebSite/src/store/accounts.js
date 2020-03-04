export default {
    state: {
        accounts: []
    },
    getters: {
        accounts (state) {
            return state.accounts
        },
        activeAccount (state) {
            return state.accounts.find(account => account.active)
        }
    },
    mutations: {
        SET_ACCOUNTS (store, payload) {
            store.accounts = payload
        },
        SET_ACTIVE (store, accountName) {
            const account = store.accounts.find(account => account.name === accountName)

            if (account) {
                store.accounts.forEach(account => { account.active = false })
                account.active = true
            }
        }
    },
    actions: {
        setAccounts ({ commit }, payload) {
            commit('SET_ACCOUNTS', payload)
        },
        setActive ({ commit }, accountName) {
            commit('SET_ACTIVE', accountName)
        }
    }
}
