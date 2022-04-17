import dashboard from './Dashboard'
import orders from './Orders'
import products from './Products'
import users from './Users'
import categries from './Category'
import configurations from './Configurations'
import promotions from './Promotions'

// ** Merge & Export
export default [...dashboard,  ...products, ...categries, ...promotions, ...users, ...orders, ...configurations]