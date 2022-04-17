// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import users from '@src/views/user/store'
import categories from '@src/views/category/store'
import products from '@src/views/product/store'
import sliders from '@src/views/appconfig/store'
import discounts from '@src/views/promotion/discount/store'
const rootReducer = {
  auth,
  navbar,
  layout,
  users,
  categories,
  products,
  sliders,
  discounts
}

export default rootReducer
