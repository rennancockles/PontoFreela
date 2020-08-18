import accountBusiness from './accountBusiness'
import reportBusiness from './reportBusiness'
import closingDAO from '../DAL/closingDAO'
import { msToStringHour } from '../Helpers/dateTimeHelper'

export default {
    list: (accountId, userId) => closingDAO.list(accountId, userId),

    create: async (closingInput) => {
        const account = await accountBusiness.findById(closingInput.accountId)
        let reports = await reportBusiness.listByAccountId(closingInput.accountId, closingInput)
        const openedReports = reports.filter(r => !r.closingId)

        closingInput.totalMs = openedReports.reduce((acc, cur) => acc + cur.workedMS, 0)
        closingInput.totalTime = msToStringHour(closingInput.totalMs)
        closingInput.totalValue = closingInput.totalMs * account.hourlyRate / 36e5

        closingInput.dateFrom = openedReports.reduce((prev, curr) => prev.date < curr.date ? prev : curr).date.toISOString().split('T')[0]
        closingInput.dateTo = openedReports.reduce((prev, curr) => prev.date > curr.date ? prev : curr).date.toISOString().split('T')[0]

        const closingId = await closingDAO.create(closingInput)
        closingDAO.apply(closingInput, closingId)
        
        return reportBusiness.listByAccountId(closingInput.accountId, closingInput)
    },

    delete: async (closingId, accountId, userId) => {
        await closingDAO.unapply(closingId)
        await closingDAO.delete(closingId)
        
        return closingDAO.list(accountId, userId)
    },

    changePaidStatus: async (closingId, accountId, userId, paidStatus) => {
        await closingDAO.changePaidStatus(closingId, accountId, paidStatus)
        
        return closingDAO.list(accountId, userId)
    }
}