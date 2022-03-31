import { lazy } from 'react'

const UsersRoutes = [
    {
        path: '/users/list',
        exact: true,
        component: lazy(() => import('../../views/user/list'))
        
    }
]

export default UsersRoutes
