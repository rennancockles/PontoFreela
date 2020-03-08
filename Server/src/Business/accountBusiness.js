import accountDAO from '../DAL/accountDAO'

export default {
    update: async (account, userId) => {
        const success = await accountDAO.update(account, userId)
        
        if (success) return account
        else return null
    },
    
    delete: async (account, userId) => {
        const userAccounts = await accountDAO.listByUserId(userId)

        if (userAccounts.length === 1) return null

        if (account.active) {
            const newActiveAccount = userAccounts.find(acc => !acc.active)
            accountDAO.updateActive(newActiveAccount, userId, true)
        }
        
        const success = await accountDAO.delete(account, userId)
        
        if (success) return await accountDAO.listByUserId(userId)
        else return null
    }
}