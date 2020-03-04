export default [
    {
        key: 'Registers',
        title: 'Registros',
        icon: 'mdi-format-list-bulleted',
        to: '/',
        active: true,
        // to: { name: 'users.index' },
        subitems: [
            {
                key: 'Report',
                title: 'Relatório',
                to: '/'
                // to: { name: 'users.index' },
            },
            {
                key: 'NewRegister',
                title: 'Novo Registro',
                to: '/'
                // to: { name: 'users.index' },
            }
        ]
    },
    {
        key: 'Closures',
        title: 'Fechamentos',
        icon: 'mdi-archive-outline',
        to: '/',
        // to: { name: 'users.index' },
        subitems: [
            {
                key: 'List',
                title: 'Lista',
                to: '/'
                // to: { name: 'users.index' },
            },
            {
                key: 'NewClosure',
                title: 'Novo Fechamento',
                to: '/'
                // to: { name: 'users.index' },
            }
        ]
    }
]
