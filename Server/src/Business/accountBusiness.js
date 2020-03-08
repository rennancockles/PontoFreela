import accountDAO from '../DAL/accountDAO'

export default {
    update: async (account, userId) => {
        const success = await accountDAO.update(account, userId)
        
        if (success) return account
        else return null
    }
}