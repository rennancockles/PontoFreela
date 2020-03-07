import Auth from '@/auth.js'

export default (to, from, next) => {
    const needAuth = to.matched.some(record => record.meta.auth)

    if (needAuth) {
        if (!Auth.isLoggedIn()) {
            next({
                path: '/auth/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
}
