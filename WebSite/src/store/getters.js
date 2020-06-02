import Auth from '@/auth.js'

function msToStringHour (ms) {
    const hour = Math.floor(ms / 36e5)
    const hourStr = (hour < 10 ? '0' : '') + hour
    const minutes = Math.round(60 * ((ms / 36e5) % 1))
    const minutesStr = (minutes < 10 ? '0' : '') + minutes
    return `${hourStr}:${minutesStr}`
}

function getTotalWorkedMs (reports) {
    let totalWorkedMs = 0

    if (reports) {
        totalWorkedMs = reports
            .filter(rep => !rep.closingId)
            .map(rep => rep.workedMS)
            .reduce((acc, curr) => acc + curr, 0)
    }

    return totalWorkedMs
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
        const totalWorkedMs = getTotalWorkedMs(activeAccount.reports)

        return msToStringHour(totalWorkedMs)
    },
    money (_, _getters) {
        const activeAccount = _getters.activeAccount
        const hourlyRate = parseFloat(activeAccount.hourlyRate || '0')
        const totalWorkedMs = getTotalWorkedMs(activeAccount.reports)
        const totalMoney = hourlyRate * totalWorkedMs / (1000 * 60 * 60)

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
