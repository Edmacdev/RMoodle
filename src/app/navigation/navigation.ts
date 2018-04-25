export const navigation = [
    {
        'id'      : 'moodles',
        'title'   : 'Moodles',
        'translate': 'Moodles',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'moodles_manage',
                'title': 'Gerenciar',
                'translate': 'Gerenciar',
                'type' : 'item',
                'icon' : 'settings',
                'url'  : '/moodles/settings'

            }
        ]
    },
    {
        'id'      : 'courses',
        'title'   : 'Cursos',
        'translate': 'Cursos',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'courses_report',
                'title': 'Relatório',
                'translate': 'Relatório',
                'type' : 'item',
                'icon' : 'info',
                'url'  : '/courses/report'

            }
        ]
    },
    {
        'id'      : 'user',
        'title'   : 'Usuário',
        'translate': 'Usuário',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'user_profile',
                'title': 'Perfil',
                'translate': 'Perfil',
                'type' : 'item',
                'icon' : 'account_circle',
                'url'  : '/user/profile'

            }
        ]
    }
];
