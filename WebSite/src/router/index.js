import Vue from 'vue'
import VueRouter from 'vue-router'

import BeforeRouter from './BeforeRouter.js'

import authRoutes from './auth'
import configRoutes from './config'
import reportRoutes from './report'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        redirect: { name: 'report.list' }
    },
    ...authRoutes,
    ...configRoutes,
    ...reportRoutes
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(BeforeRouter)

export default router
