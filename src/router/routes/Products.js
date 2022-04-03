import { lazy } from 'react'

const ProductsRoutes = [
    {
        path: '/products/list',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/product/list'))
    }
]

export default ProductsRoutes
