// ** React Imports
import { Fragment, useState, useEffect } from 'react'

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

import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import {Coffee } from 'react-feather'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const ToastErrContent = ({_content}) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='danger' icon={<Coffee size={12} />} />
          <h6 className='toast-title fw-bold'>Error!</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>{_content}</span>
      </div>
    </Fragment>
)
const AddNewProductModal = (props) => {
    // ** Props
    const {
        store,
        dispatch,
        open,
        toggleModal,
        getProducts,
        addStarting,
        categoryStore
    } = props
    // ** States
    const [status, setStatus] = useState(true)
    const [productname, setProductname] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [category, setCategory] = useState('empty')
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)

    const [image, setImage] = useState({ preview: "", raw: "" })
    useEffect(() => {
        if (!store.addStatus) {
            setStatus(true)
            setProductname("")
            setProductDescription("")
            setCategory("empty")
            setStock(0)
            setPrice(0)
        }
    }, [store.addStatus])
    const handleChange = e => {
        if (e.target.files.length) {
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          })
        }
    }

    const onSubmit = async (event) =>  {
        event.preventDefault()
        if (image.raw) {
            const formData = new FormData()
            if (category === "empty") {
                formData.append("category", categoryStore.allData[0].id)  
            } else {
                formData.append("category", category)
            }
            formData.append("name", productname)
            if (productDescription) {
                formData.append("description", productDescription)
            }
            formData.append("price", price)
            formData.append("stock", stock)
            formData.append("status", status)
            formData.append("image", image.raw)
            await apiClient.post("/products/", formData, { headers : {
                "content-type": "multipart/form-data",
                Accept: '*/*'
               }
            })
            dispatch(addStarting(false))
            dispatch(getProducts(store.params))
        } else {
            toast.warning(
                <ToastErrContent _content={"You must select the image of new Product."} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
        }
        
    }

    return (
        <Fragment>
        <Modal isOpen={open} toggle={toggleModal} className='modal-dialog-centered modal-lg'>
            <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
            <div className='text-center mb-2'>
                <h1 className='mb-1'>Add New Product Detail</h1>
                <p>Adding product details</p>
            </div>
            <Row tag='form' className='gy-1 pt-75' onSubmit={onSubmit}>
                <Col md={6} className='text-center d-flex align-items-center' xs={6}>
                    <Label className='form-label cursor-pointer' htmlFor='upload-button'>
                        { image.preview ? <div className='item-img text-center mx-auto' style={{width: "250px", Height : "250px"}}>
                            <img className='card-img-top' style={{width: "250px", Height : "250px"}} src={ image.preview } alt="image" />
                        </div> : <h3>Select the image of new product.</h3>}
                        
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
                        <Input id='stock' name='stock' required type='number' value={stock} onChange={e => {
                            setStock(e.target.value)
                        }} />
                    </Col>
                </Col>
                
                <Col xs={12} className='text-center mt-2 pt-50'>
                    <Button type='submit' className='me-1' color='primary'>
                        Add
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

export default AddNewProductModal
