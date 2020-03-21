import accountDAO from '../DAL/accountDAO'

export default {
    listByUserId: userid => accountDAO.listByUserId(userid),

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
            accountDAO.updateActive(newActiveAccount.id, userId, true)
        }
        
        const success = await accountDAO.delete(account, userId)
        
        if (success) return await accountDAO.listByUserId(userId)
        else return null
    },

    setActive: async (id, userId) => {
        const activeAccount = await accountDAO.getActive(userId)

        await accountDAO.updateActive(activeAccount.id, userId, false)
        await accountDAO.updateActive(id, userId, true)

        return await accountDAO.getActive(userId)
    }
}