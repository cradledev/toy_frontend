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
import { addCategory } from '../store'

const AddCategoryModal = ({open, toggleModal}) => {
    // ** States
    const [categoryname, setCategoryname] = useState("")
    const [parent, setParent] = useState("empty")
    const [data, setData] = useState([])
    // ** Hooks
    const dispatch = useDispatch()
    const store = useSelector(state => state.categories)

    useEffect(() => {
        setData(store.allData)
        if (!store.addStatus) {
            setCategoryname("")
            setParent("empty")
            setData([])
        }
    }, [dispatch, store.selectedCategoryForAdd])
   
    const onSubmit = () => {
        if (parent === "empty") {
            dispatch(addCategory({category_name : categoryname }))
        } else {
            dispatch(addCategory({category_name : categoryname, parent }))
        }
        
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
            <h1 className='text-center mb-1'>Add New Category</h1>
            <p className='text-center'>Add new product category</p>
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
                <Col md={12} xs={12}>
                    <Label className='form-label' for='parent'>
                        Select Parent
                    </Label>
                    <Input type='select' id='parent' name='parent' value={parent} onChange={e => {
                        setParent(e.target.value)
                    }}>
                        <option key="top_level_category" value="empty" >Top Level</option>
                        { data.map((item, key) => {
                            return (
                                <option key={key} value={item.id === null ? "empty" : item.id}>{item.id === null ? "Top Level" : item.name}</option>
                            )
                        }) }
                    </Input>
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

export default AddCategoryModal
