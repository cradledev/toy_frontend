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
import { editCategory, renameCategory } from '../store'

import {apiClient} from '@utils'

const endpoint = "http://192.168.116.44:3001/api/v1"

const EditCategoryModal = ({open, toggleModal}) => {
    // ** States
    const [categoryname, setCategoryname] = useState("")
    const [image, setImage] = useState({ preview: "", raw: "" })
    // ** Hooks
    const dispatch = useDispatch()
    const store = useSelector(state => state.categories)

    const handleChange = e => {
        if (e.target.files.length) {
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          })
        }
    }

    useEffect(() => {
        if (store.selectedCategory) {
            setCategoryname(store.selectedCategory?.name)
            setImage({
                preview: store.selectedCategory?.image ? `${endpoint}/categories/image/${store.selectedCategory?.image}` : "",
                raw: ""
            })
        }
        // if (!store.editStatus) {
        //     toggleModal()
        // }
    }, [dispatch, store.selectedCategory])
   
    const onSubmit = async () => {
        const _id = store.selectedCategory?._id
        if (image.raw) {
            const formData = new FormData()
            formData.append("category_id", store.selectedCategory?._id)
            formData.append("category_name", categoryname)
            formData.append("image", image.raw)
            await apiClient.post(`/categories/renameCategory`, formData, { headers : {
                "content-type": "multipart/form-data",
                Accept: '*/*'
               }
            })
            dispatch(editCategory({id : _id, open : false}))
        } else {
            dispatch(renameCategory({category_id : store.selectedCategory?._id, category_name : categoryname }))
        }
        
    }

    return (
        <Fragment>
            <Modal
                isOpen={open}
                toggle={toggleModal}
                className='modal-dialog-centered  modal-lg'
            >
                <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <h1 className='text-center mb-1'>Edit Category</h1>
                    <p className='text-center'>Edit product category</p>
                    <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={e => {
                        e.preventDefault()
                        onSubmit()
                    }}>
                         <Col md={6} className='text-center d-flex align-items-center' xs={6}>
                            <Label className='form-label cursor-pointer' htmlFor='upload-button'>
                            { image.preview ? <div className='item-img text-center mx-auto' style={{width: "250px", Height : "250px"}}>
                            <img className='card-img-top' style={{width: "250px", Height : "250px"}} src={ image.preview } alt="image" />
                        </div> : <h3>No Image for this category.</h3>}
                            </Label>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col xs={6} md={6}>
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
                        
                        <Col className='text-center mt-3' xs={12}>
                            <Button type='submit' className='me-1' color='primary'>
                                Save
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
