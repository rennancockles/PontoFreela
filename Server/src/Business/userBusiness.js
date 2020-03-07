import moment from 'moment'
import userDAO from '../DAL/userDAO'
import accountDAO from '../DAL/accountDAO'

export default {
    findById: async (id) => {
        const user = await userDAO.findById(id)

        if (!user) return null

        const accounts = await accountDAO.listByUserId(user.id)

        return { user, accounts }
    },

    update: async (user, id) => {
        user.id = id
        user.birth = moment(user.birth).format('YYYY-MM-DD')
        
        const success = await userDAO.update(user)
        
        if (success) return user
        else return null
    }
}