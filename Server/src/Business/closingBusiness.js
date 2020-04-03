import reportBusiness from './reportBusiness'
import closingDAO from '../DAL/closingDAO'

export default {
    create: async (closingInput) => {
        const closingId = await closingDAO.create(closingInput)
        closingDAO.apply(closingInput, closingId)
        
        return reportBusiness.listByAccountId(closingInput.accountId, closingInput)
    }
}