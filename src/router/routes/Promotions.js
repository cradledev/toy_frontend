import { lazy } from 'react'

const PromotionsRoutes = [
    {
        path: '/promotions/discount',
        exact: true,
        component: lazy(() => import('../../views/promotion/discount'))
        
    }
]

export default PromotionsRoutes
