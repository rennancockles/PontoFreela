export default [
    {
        key: 'Records',
        title: 'Registros',
        icon: 'mdi-format-list-bulleted',
        active: true,
        subitems: [
            {
                key: 'Report',
                title: 'Relatório',
                to: { name: 'report.list' }
            },
            {
                key: 'NewRecord',
                title: 'Novo Registro',
                to: { name: 'report.new' }
            }
        ]
    },
    {
        key: 'Closures',
        title: 'Fechamentos',
        icon: 'mdi-archive-outline',
        to: '/',
        subitems: [
            {
                key: 'List',
                title: 'Lista',
                to: '/'
            },
            {
                key: 'NewClosure',
                title: 'Novo Fechamento',
                to: '/'
            }
        ]
    }
]
