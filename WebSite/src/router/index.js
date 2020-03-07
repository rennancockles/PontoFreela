import Vue from 'vue'
import VueRouter from 'vue-router'

import BeforeRouter from './BeforeRouter.js'

import authRoutes from './auth'

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '*',
    //     redirect: { name: 'home.index' }
    // },
    // {
    //     path: '/',
    //     redirect: { name: 'home.index' }
    // },
    // {
    //     path: '/home',
    //     name: 'home.index',
    //     component: Home,
    //     meta: {
    //         auth: true
    //     }
    // },
    ...authRoutes
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(BeforeRouter)

export default router
