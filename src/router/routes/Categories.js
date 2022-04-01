import { lazy } from 'react'

const CategoriesRoutes = [
    {
        path: '/category/list',
        component: lazy(() => import('../../views/category/list'))
    }
]

export default CategoriesRoutes
