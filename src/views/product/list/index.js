// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// import edit product modal 
import EditProductModal from './EditProduct'
import AddProductModal from './AddProduct'
// ** Styles
import '@styles/react/apps/app-ecommerce.scss'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, deleteProduct, editProduct, updateProduct, addStarting} from '../store'
import { getAllData } from '../../category/store'

const ProductList = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // edit product mdal
  const [modalOpen, setModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.products)
  const categoryStore = useSelector(state => state.categories)
  // ** Function to toggle modal
  const toggleModal = () => {
    setModalOpen(false)
    dispatch(editProduct({id : store.productDetail?._id, open : false}))
  }
  const toggleAddModal = () => {
    setAddModalOpen(false)
    dispatch(addStarting(false))
  }
  useEffect(() => {
    setAddModalOpen(false)
    setModalOpen(false)
  }, [])
  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        category : null,
        perPage: 9,
        page: 1
      })
    )
  }, [dispatch])

  useEffect(() => {
    setModalOpen(store.editStatus)
  }, [store.editStatus])

  useEffect(() => {
    setAddModalOpen(store.addStatus)
  }, [store.addStatus])
  return (
    <Fragment>
      <Products
        store={store}
        dispatch={dispatch}
        activeView={activeView}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        editProduct={editProduct}
        addStarting={addStarting}
        setActiveView={setActiveView}
        setSidebarOpen={setSidebarOpen}
        deleteProduct={deleteProduct}
      />
      <Sidebar sidebarOpen={sidebarOpen} data={store} dispatch={dispatch} getAllData={getAllData} getProducts={getProducts} />
      <EditProductModal open={modalOpen} categoryStore={categoryStore} editProduct={editProduct} updateProduct={updateProduct} store={store} dispatch={dispatch} getProducts={getProducts} toggleModal={toggleModal} />
      <AddProductModal open={addModalOpen} categoryStore={categoryStore} addStarting={addStarting} store={store} dispatch={dispatch} getProducts={getProducts} toggleModal={toggleAddModal} />
    </Fragment>
  )
}
export default ProductList
