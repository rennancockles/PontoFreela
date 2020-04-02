import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import accountBusiness from '../Business/accountBusiness'
import userDAO from '../DAL/userDAO'
import mailer from '../Email/recover'

function getToken ({ id }) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3h'
    })
}

export default {
    login: async (email, password) => {
        const user = await userDAO.findByEmail(email)

        if (!user || !await bcrypt.compare(password, user.password)) return null

        const token = getToken(user)

        return { token, user }
    },

    register: async user => {
        user.password = await bcrypt.hash(user.password, 10)
        user.id = await userDAO.create(user)

        accountBusiness.insert({ name: 'Default', hourlyRate: 0, active: true }, user.id)

        const token = getToken(user)

        return { token, user }
    },

    recover: async email => {
        const user = await userDAO.findByEmail(email)

        if (user) {
            mailer.send(user)
        }

        return ''
    }
}