import moment from 'moment'
import bcrypt from 'bcryptjs'
import userDAO from '../DAL/userDAO'

export default {
    findById: id => userDAO.findById(id),

    update: async (user, id) => {
        user.id = id
        user.birth = moment(user.birth).format('YYYY-MM-DD')
        
        const success = await userDAO.update(user)
        
        if (success) return user
        else return null
    },

    updatePassword: async ({ currentPassword, password }, userId) => {
        const user = await userDAO.findById(userId)
        const passwordHash = await bcrypt.hash(password, 10)
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isPasswordMatch) throw new Error('Senha atual incorreta!')
        
        return userDAO.updatePassword(passwordHash, userId)
    }
}