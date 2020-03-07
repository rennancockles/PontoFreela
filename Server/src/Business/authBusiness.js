import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userDAO from '../DAL/userDAO'
import accountDAO from '../DAL/accountDAO'

export default {
    login: async (email, password) => {
        const user = await userDAO.findByEmail(email)

        if (!user || !await bcrypt.compare(password, user.password)) return null

        const accounts = await accountDAO.listByUserId(user.id)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '3h'
        })

        return { token, user, accounts }
    }
}