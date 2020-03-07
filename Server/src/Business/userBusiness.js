import userDAO from '../DAL/userDAO'
import accountDAO from '../DAL/accountDAO'

export default {
    list: async () => {
        const users = await userDAO.list()
        
        for (let i = 0; i < users.length; i++)
        {
            users[i].accounts = await accountDAO.listByUserId(users[i].id)
        }
        
        return users
    },

    findById: async (id) => {
        const user = await userDAO.findById(id)
        if (user) user.accounts = await accountDAO.listByUserId(id)

        return user
    }
}