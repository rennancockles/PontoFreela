import accountBusiness from './accountBusiness'
import reportBusiness from './reportBusiness'
import closingDAO from '../DAL/closingDAO'

function msToStringHour (ms) {
    const hour = Math.floor(ms / 36e5)
    const hourStr = (hour < 10 ? '0' : '') + hour
    const minutes = Math.round(60 * ((ms / 36e5) % 1))
    const minutesStr = (minutes < 10 ? '0' : '') + minutes
    return `${hourStr}:${minutesStr}`
}

export default {
    list: (accountId, userId) => closingDAO.list(accountId, userId),

    create: async (closingInput) => {
        const account = await accountBusiness.findById(closingInput.accountId)
        let reports = await reportBusiness.listByAccountId(closingInput.accountId, closingInput)
        const openedReports = reports.filter(r => !r.closingId)

        closingInput.totalMs = openedReports.reduce((acc, cur) => acc + cur.workedMS, 0)
        closingInput.totalTime = msToStringHour(closingInput.totalMs)
        closingInput.totalValue = closingInput.totalMs * account.hourlyRate / 36e5

        const closingId = await closingDAO.create(closingInput)
        closingDAO.apply(closingInput, closingId)
        
        return reportBusiness.listByAccountId(closingInput.accountId, closingInput)
    },

    delete: async (closingId, accountId, userId) => {
        await closingDAO.unapply(closingId)
        await closingDAO.delete(closingId)
        
        return closingDAO.list(accountId, userId)
    }
}