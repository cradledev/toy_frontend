
import Table from './slider/Table'

import AddSlierModal from './slider/AddSlider'
import EditSlierModal from './slider/EditSlider'

import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect, useState} from 'react'

import { getData, addStarting, editSlider, updateSlider} from './store'

import './slider/custom.scss'
const HomeSliderImageConfig = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.sliders)

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const toggleAddModal = () => {
    setAddModalOpen(false)
    dispatch(addStarting(false))
  }
  const toggleModal = () => {
    setModalOpen(false)
    dispatch(editSlider({id : store.selectedSlider?._id, open : false}))
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
      <AddSlierModal open={addModalOpen} addStarting={addStarting} store={store} dispatch={dispatch} getData={getData} toggleModal={toggleAddModal} />
      <EditSlierModal open={modalOpen} updateSlider={updateSlider} editSlider={editSlider} store={store} dispatch={dispatch} getData={getData} toggleModal={toggleModal} />
    </Fragment>
  )
}

export default HomeSliderImageConfig
