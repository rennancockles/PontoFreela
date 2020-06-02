import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import accountBusiness from '../Business/accountBusiness'
import userDAO from '../DAL/userDAO'
import recoverEmail from '../Email/recover'
import createEncryption from '../Encryption'

function getJwtToken ({ id }) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

function getRecoverToken (email) {
    const obj = {
        email: email,
        action: 'recover',
        createdAt: moment().unix(),
        validHours: 24
    }
    return createEncryption().encrypt(JSON.stringify(obj))
}

function validateRecoverToken (token, userEmail) {
    const decrypted = createEncryption().decrypt(token)
    const obj = JSON.parse(decrypted)

    const isValidEmail = obj.email === userEmail
    const isValidAction = obj.action === 'recover'
    const isValidHours = moment().diff(moment.unix(obj.createdAt), 'hours') <= obj.validHours

    if (isValidEmail && isValidAction && isValidHours) return true
    else return false
}

export default {
    login: async (email, password) => {
        const user = await userDAO.findByEmail(email)

        if (!user || !await bcrypt.compare(password, user.password)) return null

        const token = getJwtToken(user)

        return { token, user }
    },

    register: async user => {
        user.password = await bcrypt.hash(user.password, 10)
        user.id = await userDAO.create(user)

        accountBusiness.insert({ name: 'Default', hourlyRate: 0, active: true }, user.id)

        const token = getJwtToken(user)

        return { token, user }
    },

    sendRecoverEmail: async email => {
        const user = await userDAO.findByEmail(email)

        if (user) {
            const name = `${user.name.charAt(0).toUpperCase()}${user.name.toLowerCase().slice(1)}`
            const lastname = `${user.lastname.charAt(0).toUpperCase()}${user.lastname.toLowerCase().slice(1)}`
            const fullName = `${name} ${lastname}`

            const token = getRecoverToken(user.email)
            const url = `${process.env.CLIENT_URL}/auth/recover/${token}`

            recoverEmail.send(user.email, fullName, url)
        }

        return ''
    },

    recoverPassword: async ({ token, email, password }) => {
        const user = await userDAO.findByEmail(email)

        if (user && validateRecoverToken(token, email)) {
            const passwordHash = await bcrypt.hash(password, 10)
            userDAO.updatePassword(passwordHash, user.id)
        } else {
            throw new Error('Token inválido!')
        }

        return ''
    }
}