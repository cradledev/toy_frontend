import dashboard from './Dashboard'
import orders from './Orders'
import products from './Products'
import users from './Users'

// ** Merge & Export
export default [...dashboard,  ...products, ...users, ...orders]