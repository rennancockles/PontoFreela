import jwt from 'jsonwebtoken'

let _token = ''
let _user = {}
let _accounts = []

export default {
    clear () {
        localStorage.clear()
        _token = ''
        _user = {}
        _accounts = []
    },
    setItem (key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    getItem (key) {
        return JSON.parse(localStorage.getItem(key))
    },
    removeItem (key) {
        return localStorage.removeItem(key)
    },
    isLoggedIn () {
        const token = this.getToken()
        if (!token) return false

        const decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_SECRET)

        if (decodedToken) {
            return true
        } else {
            return false
        }
    },
    getToken () {
        if (!_token) {
            _token = this.getItem('authToken')
        }
        return _token
    },
    getUser () {
        if (!_user.id) {
            _user = this.getItem('user')
        }
        return _user
    },
    getAccounts () {
        if (_accounts.length === 0) {
            _accounts = this.getItem('accounts')
        }
        return _accounts
    }
}
