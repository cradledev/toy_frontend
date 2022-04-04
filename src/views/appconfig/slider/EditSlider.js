// ** React Imports
import { Fragment, useState, useEffect } from 'react'

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

const EditSliderModal = (props) => {
    // ** Props
    const {
        store,
        dispatch,
        open,
        toggleModal,
        getData,
        editSlider,
        updateSlider
    } = props
    // ** States
    const [status, setStatus] = useState(true)
    const [title, setTitle] = useState("")
    const [order, setOrder] = useState(0)

    const [image, setImage] = useState({ preview: "", raw: "" })
    useEffect(() => {
        if (store.selectedSlider) {
            setTitle(store.selectedSlider?.title)
            setOrder(store.selectedSlider?.order)
            setStatus(store.selectedSlider?.status)
            setImage({
                preview: store.selectedSlider?.image ? `${endpoint}/config/sliderimage/${store.selectedSlider?.image}` : "",
                raw: ""
            })
        }
    }, [dispatch, store.selectedSlider])
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
        const _id = store.selectedSlider?._id
        if (image.raw) {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("order", order)
            formData.append("status", status)
            formData.append("image", image.raw)
            await apiClient.put(`/config/updateSlider/${_id}`, formData, { headers : {
                "content-type": "multipart/form-data",
                Accept: '*/*'
               }
            })
            dispatch(editSlider({id : store.selectedSlider._id, open : false}))
            dispatch(getData(store.params))
        } else {
            const data = {title, order, status}
            dispatch(updateSlider({id : _id, putData : data, type : "text"}))
        }
        
    }

    return (
        <Fragment>
            <Modal isOpen={open} toggle={toggleModal} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>Edit Slider Detail</h1>
                    <p>Editslider details</p>
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
                            <Label className='form-label' for='title'>
                                Title
                            </Label>
                            <Input
                                type='text'
                                id='title'
                                name='title'
                                placeholder='A favorite Car'
                                value={title}
                                onChange={e => {
                                    setTitle(e.target.value)
                                }}
                            />
                        </Col>
                        <Col md={12} xs={12}>
                            <Label className='form-label' for='order'>
                                Order
                            </Label>
                            <Input type='number' id='order' name='order' value={order} onChange={e => {
                                setOrder(e.target.value)
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
                    </Col>
                    
                    <Col xs={12} className='text-center mt-2 pt-50'>
                        <Button type='submit' className='me-1' color='primary'>
                            Edit
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

export default EditSliderModal
