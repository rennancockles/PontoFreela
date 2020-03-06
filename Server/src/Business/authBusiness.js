import userDAO from '../DAL/userDAO'
import accountDAO from '../DAL/accountDAO'

export default {
    login: async (email, password) => {
        const user = await userDAO.findByLogin(email, password)
        if (user) user.accounts = await accountDAO.listByUserId(user.id)

        return user
    }
}