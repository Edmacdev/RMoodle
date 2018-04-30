export const navigation = [
  {
      'id'      : 'dashboard',
      'title'   : 'Dashboard',
      'translate': 'Dashboard',
      'type'    : 'group',
      'children': [
          {
              'id'   : 'dashboard_analytics',
              'title': 'Análise',
              'translate': 'Análise',
              'type' : 'item',
              'icon' : 'dashboard',
              'url'  : '/dashboard'

          }
      ]
  },
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
                'id'   : 'courses_monitor',
                'title': 'Monitoramento',
                'translate': 'Monitoriamento',
                'type' : 'item',
                'icon' : 'info',
                'url'  : '/courses'

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
