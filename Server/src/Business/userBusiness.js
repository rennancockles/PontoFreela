import moment from 'moment'
import userDAO from '../DAL/userDAO'

export default {
    findById: id => userDAO.findById(id),

    update: async (user, id) => {
        user.id = id
        user.birth = moment(user.birth).format('YYYY-MM-DD')
        
        const success = await userDAO.update(user)
        
        if (success) return user
        else return null
    }
}