import AuthRoutes from './Auth'
import OrdersRoutes from './Orders'
import ProductsRoutes from './Products'
import UsersRoutes from './Users'
import CategoriesRoutes from './Categories'
import DashboardRoutes from './Dashboard'
import ConfigurationsRoutes from './Configurations'
import PromotionsRoutes from './Promotions'
// ** Document title
const TemplateTitle = '%s - Toy Ecommerce Admin Panel'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [...DashboardRoutes, ...AuthRoutes, ...OrdersRoutes, ...ProductsRoutes, ...UsersRoutes, ...CategoriesRoutes, ...ConfigurationsRoutes, ...PromotionsRoutes]

export { DefaultRoute, TemplateTitle, Routes }
