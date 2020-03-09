const List = () => import(/* webpackChunkName: "report" */ '@/components/report/List.vue')
const New = () => import(/* webpackChunkName: "report" */ '@/components/report/New.vue')

export default [
    {
        path: '/report/list',
        name: 'report.list',
        component: List,
        meta: {
            auth: true
        }
    },
    {
        path: '/report/new',
        name: 'report.new',
        component: New,
        meta: {
            auth: true
        }
    }
]
