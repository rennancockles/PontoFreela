export default [
    {
        key: 'Records',
        title: 'Registros',
        icon: 'mdi-format-list-bulleted',
        to: '/',
        active: true,
        subitems: [
            {
                key: 'Report',
                title: 'Relatório',
                to: '/'
            },
            {
                key: 'NewRecord',
                title: 'Novo Registro',
                to: '/'
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
