import reportBusiness from './reportBusiness'
import closingDAO from '../DAL/closingDAO'

export default {
    list: (accountId, userId) => closingDAO.list(accountId, userId),

    create: async (closingInput) => {
        const closingId = await closingDAO.create(closingInput)
        closingDAO.apply(closingInput, closingId)
        
        return reportBusiness.listByAccountId(closingInput.accountId, closingInput)
    }
}