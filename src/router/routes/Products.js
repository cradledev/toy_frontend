import { lazy } from 'react'

const ProductsRoutes = [
    {
        path: '/products/list',
        component: lazy(() => import('../../views/product'))
    }
]

export default ProductsRoutes
