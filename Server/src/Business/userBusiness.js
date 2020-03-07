import userDAO from '../DAL/userDAO'
import accountDAO from '../DAL/accountDAO'

export default {
    findById: async (id) => {
        const user = await userDAO.findById(id)

        if (!user) return null

        const accounts = await accountDAO.listByUserId(user.id)

        return { user, accounts }
    }
}