import accountDAO from '../DAL/accountDAO'

export default {
    upsert: async (account, userId) => {
        if (account.id) {
            return exports.default.update(account, userId)
        } else {
            return exports.default.insert(account, userId)
        }
    },

    insert: async (account, userId) => {
        account.active = false

        const id = await accountDAO.insert(account, userId)

        if (id) {
            account.id = id
            return account
        } else {
            return null
        }
    },

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