
import Table from './Table'

import AddDiscountModal from './AddDiscount'
import EditDiscountModal from './EditDiscount'

import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect, useState} from 'react'

import { getData, addStarting, editDiscount, updateDiscount, saveDiscount} from './store'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const DiscountPage = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.discounts)

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const toggleAddModal = () => {
    setAddModalOpen(false)
    dispatch(addStarting(false))
  }
  const toggleModal = () => {
    setModalOpen(false)
    dispatch(editDiscount({id : store.selectedSlider?._id, open : false}))
  }
  useEffect(() => {
    setAddModalOpen(store.addStatus)
  }, [store.addStatus])

  useEffect(() => {
    setModalOpen(store.editStatus)
  }, [store.editStatus])

  useEffect(() => {
    dispatch(
      getData({
        sort : 'asc',
        sortColumn : '_id',
        page: 1,
        perPage: 10,
        status: "empty"
      })
    )
  }, [dispatch])
  return (
    <Fragment>
      <Table  
        store={store}
        dispatch={dispatch}
        getData={getData}
        addStarting={addStarting}
      />
      <AddDiscountModal open={addModalOpen} addStarting={addStarting} store={store} dispatch={dispatch} saveDiscount={saveDiscount} toggleModal={toggleAddModal} />
      <EditDiscountModal open={modalOpen} updateDiscount={updateDiscount} store={store} dispatch={dispatch} toggleModal={toggleModal} />
    </Fragment>
  )
}

export default DiscountPage
