// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Label,
  Input,
  Button,
  ModalBody,
  ModalHeader
} from 'reactstrap'

import { useSelector, useDispatch } from 'react-redux'
import { renameCategory } from '../store'

const EditCategoryModal = ({open, toggleModal}) => {
    // ** States
    const [categoryname, setCategoryname] = useState("")
    // ** Hooks
    const dispatch = useDispatch()
    const store = useSelector(state => state.categories)

    useEffect(() => {
        setCategoryname(store.selectedCategory?.name)
        if (!store.editStatus) {
            toggleModal()
        }
    }, [dispatch, store.selectedCategory])
   
    const onSubmit = () => {
        dispatch(renameCategory({category_id : store.selectedCategory?._id, category_name : categoryname }))
    }

    return (
        <Fragment>
        <Modal
            isOpen={open}
            toggle={toggleModal}
            className='modal-dialog-centered'
        >
            <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
            <h1 className='text-center mb-1'>Edit Category</h1>
            <p className='text-center'>Edit product category</p>
            <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={e => {
                e.preventDefault()
                onSubmit()
            }}>
                <Col xs={12}>
                    <Label className='form-label' for='categoryname'>
                    Category Name
                    </Label>
                    <Input
                        type='text'
                        id='categoryname'
                        name='categoryname'
                        placeholder='food'
                        value={categoryname}
                        onChange={e => {
                            setCategoryname(e.target.value)
                        }}
                        required
                    />
                </Col>
                
                <Col className='text-center mt-1' xs={12}>
                    <Button type='submit' className='me-1' color='primary'>
                        Submit
                    </Button>
                    <Button
                        color='secondary'
                        outline
                        onClick={toggleModal}
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
            </ModalBody>
        </Modal>
        </Fragment>
    )
}

export default EditCategoryModal
