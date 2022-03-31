import { lazy } from 'react'

const OrdersRoutes = [
    {
        path: '/orders/list',
        component: lazy(() => import('../../views/order'))
    }
]

export default OrdersRoutes
