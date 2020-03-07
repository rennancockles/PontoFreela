const AuthLogin = () => import(/* webpackChunkName: "auth" */ '@/components/auth/Login.vue')
const AuthLogout = () => import(/* webpackChunkName: "auth" */ '@/components/auth/Logout.vue')

export default [
    {
        path: '/auth/login',
        name: 'auth.login',
        component: AuthLogin,
        meta: {
            auth: false
        }
    },
    {
        path: '/auth/logout',
        name: 'auth.logout',
        component: AuthLogout,
        meta: {
            auth: true
        }
    }
]
