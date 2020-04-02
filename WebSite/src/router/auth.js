const AuthLogin = () => import(/* webpackChunkName: "auth" */ '@/components/auth/Login.vue')
const AuthLogout = () => import(/* webpackChunkName: "auth" */ '@/components/auth/Logout.vue')
const Register = () => import(/* webpackChunkName: "auth" */ '@/components/auth/Register.vue')

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
    },
    {
        path: '/auth/register',
        name: 'auth.register',
        component: Register,
        meta: {
            auth: false
        }
    }
]
