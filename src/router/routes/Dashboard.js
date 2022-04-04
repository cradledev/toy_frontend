import { lazy } from 'react'

const DashboardRoutes = [
    {
        path: '/home',
        exact: true,
        component: lazy(() => import('../../views/dashboard'))
    }
]

export default DashboardRoutes
