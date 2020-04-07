import Auth from '@/auth.js'

function msToStringHour (ms) {
    const hour = Math.round(ms / 36e5)
    const hourStr = (hour < 10 ? '0' : '') + hour
    const minutes = Math.round(60 * ((ms / 36e5) % 1))
    const minutesStr = (minutes < 10 ? '0' : '') + minutes
    return `${hourStr}:${minutesStr}`
}

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

    // SUMMARY
    time (_, _getters) {
        const activeAccount = _getters.activeAccount
        const totalDiff = activeAccount.reports
            .filter(rep => !rep.closingId)
            .map(rep => rep.workedMS)
            .reduce((acc, curr) => acc + curr, 0)

        return msToStringHour(totalDiff)
    },
    money (_, _getters) {
        const activeAccount = _getters.activeAccount
        const hourlyRate = parseFloat(activeAccount.hourlyRate || '0')
        const totalDiff = activeAccount.reports
            .filter(rep => !rep.closingId)
            .map(rep => rep.workedMS)
            .reduce((acc, curr) => acc + curr, 0)
        const totalMoney = hourlyRate * totalDiff / (1000 * 60 * 60)

        return totalMoney
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
