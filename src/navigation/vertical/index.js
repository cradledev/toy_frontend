import dashboard from './Dashboard'
import orders from './Orders'
import products from './Products'
import users from './Users'
import categries from './Category'

// ** Merge & Export
export default [...dashboard,  ...products, ...categries, ...users, ...orders]