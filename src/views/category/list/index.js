import { Card, CardHeader, CardBody, CardTitle} from 'reactstrap'
import { Link } from 'react-router-dom'

// import custom modals
import EditCategoryModal from './EditCategory'
import AddCategoryModal from './AddCategory'
// ** Custom Components
import Avatar from '@components/avatar'


import { getAllData, editCategory, addStarting, updateCategory} from '../store'
import { useDispatch, useSelector } from 'react-redux'

import { useState, useEffect, Fragment, useRef } from "react"
import { Tree } from "@minoru/react-dnd-treeview"
import { Droplet} from 'react-feather'
import CategoryItem from './Item'
import './index.scss'

const CategoryList = () => {

  const dispatch = useDispatch()
  const store = useSelector(state => state.categories)

  const [modalOpen, setModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [treeData, setTreeData] = useState(store.allData)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
    dispatch(editCategory({ id : store.selectedCategory?._id, open : false}))
  }
  
  const toggleAddModal = () => {
    setAddModalOpen(!addModalOpen)
    dispatch(addStarting({ id : store.selectedCategoryForAdd?._id, open : false}))
  }

  const ref = useRef(null)

  const handleOpenAll = () => ref.current.openAll()
  // ** Get data on mount
  useEffect(() => {
    setAddModalOpen(false)
    setModalOpen(false)
  }, [])
  useEffect(() => {
    dispatch(getAllData())
    setTreeData(store.allData)
    handleOpenAll()
  }, [dispatch, store.allData?.length, store.deleteStatus, store.editStatus, store.addStatus])

  useEffect(() => {
    setModalOpen(store.editStatus)
    
  }, [store.editStatus])

  useEffect(() => {
    setAddModalOpen(store.addStatus)
  }, [store.addStatus])

  const handleDrop = (newTreeData, { dragSourceId, dropTargetId }) => {
    setTreeData(newTreeData)
    if (dropTargetId === null) {
      dispatch(updateCategory({category_id : dragSourceId}))
    } else {
      dispatch(updateCategory({category_id : dragSourceId, new_parent_id : dropTargetId}))
    }
  }
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>Product Category</CardTitle>
        </CardHeader>
        <CardBody>
          <Tree
            tree={treeData}
            ref={ref}
            rootId={null}
            initialOpen = {true}
            sort={false}
            onDrop={handleDrop}
            render={(node, { depth, onToggle}) => (
              <div style={{ marginLeft: depth * 3 }} className="pt-1 d-flex justify-content-between align-items-center">
                {node.droppable && (
                  <span onClick={onToggle}><Avatar color="light-success" icon={<Droplet size={14} />} id={`av-tooltip-${node.id}`} className='mx-1' />{node.name}</span>
                )}
                <CategoryItem id={node.id} />
              </div>
            )}
          />
        </CardBody>
      </Card>
      <EditCategoryModal open={modalOpen} toggleModal={toggleModal} />
      <AddCategoryModal open={addModalOpen} toggleModal={toggleAddModal} />
    </Fragment>
  )
}

export default CategoryList
