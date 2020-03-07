const Config = () => import(/* webpackChunkName: "config" */ '@/components/config/Index.vue')

export default [
    {
        path: '/config',
        name: 'config.index',
        component: Config,
        meta: {
            auth: true
        }
    }
]
