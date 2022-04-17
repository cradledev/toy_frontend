// ** Third Party Components
import { Menu } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button
} from 'reactstrap'

const ProductsHeader = props => {
  // ** Props
  const { dispatch, addStarting, store, setSidebarOpen } = props

  return (
    <div className='ecommerce-header'>
      <Row>
        <Col sm='12'>
          <div className='ecommerce-header-items'>
            <div className='result-toggler'>
              <button className='navbar-toggler shop-sidebar-toggler' onClick={() => setSidebarOpen(true)}>
                <span className='navbar-toggler-icon d-block d-lg-none'>
                  <Menu size={14} />
                </span>
              </button>
              <span className='search-results'>{store.totalProducts} Results Found</span>
            </div>
            <div className='view-options d-flex'>
              <Button.Ripple color='primary' className="me-1" onClick={() => {
                dispatch(addStarting(true))
              }} >+ Product</Button.Ripple>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsHeader
