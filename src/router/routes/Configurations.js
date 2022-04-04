import { lazy } from 'react'

const ConfigurationsRoutes = [
    {
        path: '/config/homeslider',
        component: lazy(() => import('../../views/appconfig'))
    }
]

export default ConfigurationsRoutes
