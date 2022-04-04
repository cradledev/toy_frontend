// ** React Imports
import { Fragment, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  ModalBody,
  ModalHeader
} from 'reactstrap'

import {apiClient } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const endpoint = "http://192.168.116.44:3001/api/v1"

const EditProductModal = (props) => {
    // ** Props
    const {
        store,
        dispatch,
        open,
        toggleModal,
        editProduct,
        getProducts,
        updateProduct,
        categoryStore
    } = props
    // ** States
    const [status, setStatus] = useState(false)
    const [productname, setProductname] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [category, setCategory] = useState('empty')
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)

    const [image, setImage] = useState({ preview: "", raw: "" })

    const handleChange = e => {
        if (e.target.files.length) {
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          })
        }
    }
    useEffect(() => {
        if (store.productDetail) {
            setProductname(store.productDetail?.name)
            setProductDescription(store.productDetail?.description === null ? "" : store.productDetail?.description)
            setCategory(store.productDetail?.category)
            setStock(store.productDetail?.stock)
            setPrice(store.productDetail?.price)
            setStatus(store.productDetail?.status)
            setImage({
                preview: store.productDetail?.image ? `${endpoint}/products/image/${store.productDetail?.image}` : "",
                raw: ""
            })
        }
        
    }, [dispatch, store.productDetail])

    const onSubmit = async (event) =>  {
        event.preventDefault()
        const _id = store.productDetail?._id
        if (image.raw) {
            const formData = new FormData()
            
            formData.append("category", category)
            formData.append("name", productname)
            if (productDescription) {
                formData.append("description", productDescription)
            }
            formData.append("price", price)
            formData.append("stock", stock)
            formData.append("status", status)
            formData.append("image", image.raw)
            await apiClient.put(`/products/updateProduct/${_id}`, formData, { headers : {
                "content-type": "multipart/form-data",
                Accept: '*/*'
               }
            })
            dispatch(editProduct({id : _id, open : false}))
            dispatch(getProducts(store.params))
            // dispatch(updateProduct({id : _id, data : formData, type : "image"}))
        } else {
            const data = {category, name : productname, description : productDescription, price, stock, status}
            dispatch(updateProduct({id : _id, data, type : "text"}))
        }
        
    }

    return (
        <Fragment>
        <Modal isOpen={open} toggle={toggleModal} className='modal-dialog-centered modal-lg'>
            <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
            <div className='text-center mb-2'>
                <h1 className='mb-1'>Edit Product Detail</h1>
                <p>Updating product details</p>
            </div>
            <Row tag='form' className='gy-1 pt-75' onSubmit={onSubmit}>
                <Col md={6} className='text-center d-flex align-items-center' xs={6}>
                    <Label className='form-label cursor-pointer' htmlFor='upload-button'>
                        <div className='item-img text-center mx-auto' style={{width: "250px", Height : "250px"}}>
                            <img className='card-img-top' style={{width: "250px", Height : "250px"}} src={ image.preview } alt="image" />
                        </div>
                    </Label>
                    <input
                        type="file"
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={6} xs={6}>
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='productname'>
                            Product Name
                        </Label>
                        <Input
                            type='text'
                            id='productname'
                            name='productname'
                            placeholder='bubby'
                            value={productname}
                            onChange={e => {
                                setProductname(e.target.value)
                            }}
                            required
                        />
                    </Col>
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='category'>
                            Category
                        </Label>
                        <Input type='select' id='category' name='category' value={category} onChange={e => {
                            setCategory(e.target.value)
                        }}>
                            { categoryStore.allData.map((item, key) => {
                                return (
                                    <option key={key} value={item.id === null ? "empty" : item.id}>{item.id === null ? "Top Level" : item.name}</option>
                                )
                            }) }
                        </Input>
                    
                    </Col>
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='productDescription'>
                            Product Description
                        </Label>
                        <Input
                            type='textarea'
                            rows='3'
                            id='productDescription'
                            name='productDescription'
                            placeholder='Description is here'
                            value={productDescription}
                            onChange={e => {
                                setProductDescription(e.target.value)
                            }}
                            
                        />
                    </Col>
                    
                    
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='price'>
                            Price
                        </Label>
                        <Input type='number' id='price' required name='price' value={price} onChange={e => {
                            setPrice(e.target.value)
                        }} />
                            
                    </Col>
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='status'>
                            Status
                        </Label>
                        <Input type='select' id='status' name='status' value={status} onChange={e => {
                            setStatus(e.target.value)
                        }}>
                            <option value={true}>Active</option>
                            <option value={false} >InActive</option>
                        </Input>
                    </Col>
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='stock'>
                            Stock
                        </Label>
                        <Input id='stock' name='stock' type='number' value={stock} onChange={e => {
                            setStock(e.target.value)
                        }} />
                    </Col>
                </Col>
                
                <Col xs={12} className='text-center mt-2 pt-50'>
                    <Button type='submit' className='me-1' color='primary'>
                        Update
                    </Button>
                    <Button type='reset' color='secondary' outline onClick={toggleModal}>
                        Discard
                    </Button>
                </Col>
            </Row>
            </ModalBody>
        </Modal>
        </Fragment>
    )
}

export default EditProductModal
