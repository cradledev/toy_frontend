// ** React Imports
import { Fragment } from 'react'

import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'

import ProductTable from '../widgets/Table'
// ** Third Party Components
import classnames from 'classnames'

const ProductsPage = props => {
  // ** Props
  const {
    store,
    dispatch,
    sidebarOpen,
    addStarting,
    getProducts,
    setSidebarOpen
  } = props

  return (
    <div className='content-detached content-right'>
      <div className='content-body'>
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          addStarting={addStarting}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ProductsSearchbar dispatch={dispatch} getProducts={getProducts} store={store} />
        <Fragment>
          <ProductTable  
            
            store={store}
            dispatch={dispatch}
            getProducts={getProducts}
          />
        </Fragment>
      </div>
    </div>
  )
}

export default ProductsPage
