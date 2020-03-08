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
            payload.forEach(account => {
                if (typeof account.hourlyRate === 'number') {
                    account.hourlyRate = account.hourlyRate.toFixed(2)
                }
            })
            store.accounts = payload
        },
        SET_ACTIVE (store, accountName) {
            const account = store.accounts.find(account => account.name === accountName)

            if (account) {
                store.accounts.forEach(account => { account.active = false })
                account.active = true
            }
        },
        UPDATE_ACCOUNT (store, payload) {
            const accounts = store.accounts.filter(account => account.id !== payload.id)
            accounts.push(payload)

            this.commit('SET_ACCOUNTS', accounts)
        },
        REMOVE_ACCOUNT (store, payload) {
            const accounts = store.accounts.filter(account => account.id !== payload.id)

            this.commit('SET_ACCOUNTS', accounts)
        }
    },
    actions: {
        setAccounts ({ commit }, payload) {
            commit('SET_ACCOUNTS', payload)
        },
        setActive ({ commit }, accountName) {
            commit('SET_ACTIVE', accountName)
        },
        updateAccount ({ commit }, payload) {
            commit('UPDATE_ACCOUNT', payload)
        },
        removeAccount ({ commit }, payload) {
            commit('REMOVE_ACCOUNT', payload)
        }
    }
}
