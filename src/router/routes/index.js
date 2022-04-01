import AuthRoutes from './Auth'
import OrdersRoutes from './Orders'
import ProductsRoutes from './Products'
import UsersRoutes from './Users'
import CategoriesRoutes from './Categories'
// ** Document title
const TemplateTitle = '%s - Toy Ecommerce Admin Panel'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [...AuthRoutes, ...OrdersRoutes, ...ProductsRoutes, ...UsersRoutes, ...CategoriesRoutes]

export { DefaultRoute, TemplateTitle, Routes }
