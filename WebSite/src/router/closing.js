const List = () => import(/* webpackChunkName: "report" */ '@/components/closing/List.vue')

export default [
    {
        path: '/closings',
        name: 'closing.list',
        component: List,
        meta: {
            auth: true
        }
    }
]
