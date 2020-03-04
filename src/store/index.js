import Vue from 'vue'
import Vuex from 'vuex'

import summaryStore from './summary.js'
import userStore from './user.js'
import accountsStore from './accounts.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        summaryStore,
        userStore,
        accountsStore
    }
})
