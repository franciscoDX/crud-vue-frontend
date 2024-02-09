export default [
    {
        path: '/admin',
        component: () => import(/* webpackChunkName: "about" */ '../views/Template/Main.vue'),
        meta: { requiresAuth: false},
        children: [
            {
                path: '',
                name: 'projects',
                component: () => import(/* webpackChunkName: "projects" */ '../pages/projects/Pages/Projects.vue')
            },
        ]
    },
    {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
]