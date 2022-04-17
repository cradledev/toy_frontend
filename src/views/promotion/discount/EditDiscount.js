// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Input,
  InputGroup,
  Label,
  Button,
  ModalBody,
  ModalHeader
} from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

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

const EditSliderModal = (props) => {
    // ** Props
    const {
        store,
        dispatch,
        open,
        toggleModal,
        updateDiscount
    } = props
    // ** States
    // ** States
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [discountType, setDiscountType] = useState("AssignedToProducts")
    const [usePercentage, setUsePercentage] = useState(false)
    const [discountValue, setDiscountValue] = useState(0)
    const [useCouponCode, setUseCouponCode] = useState(false)
    const [couponCode, setCouponCode] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [discountLimitation, setDiscountLimitation] = useState("NtimesPerCustomer")
    const [times, setTimes] = useState(0)
    const [minOrderSubTotalAmount, setMinOrderSubTotalAmount] = useState(0)
    const [minOrderTotalAmount, setMinOrderTotalAmount] = useState(0)
    const [status, setStatus] = useState(true)

    useEffect(() => {
        if (store.selectedDiscount) {
            setDescription(store.selectedDiscount?.description)
            setTitle(store.selectedDiscount?.title)
            setDiscountType(store.selectedDiscount?.discountType)
            setUsePercentage(store.selectedDiscount?.usePercentage)
            setDiscountValue(store.selectedDiscount?.discountValue)
            setCouponCode(store.selectedDiscount?.couponCode)
            setUseCouponCode(store.selectedDiscount?.useCouponCode)
            setStartTime(new Date(new Date(store.selectedDiscount?.startTime).getTime() + (new Date(store.selectedDiscount?.startTime).getTimezoneOffset() * 60000)))
            setEndTime(new Date(new Date(store.selectedDiscount?.endTime).getTime() + (new Date(store.selectedDiscount?.endTime).getTimezoneOffset() * 60000)))
            setDiscountLimitation(store.selectedDiscount?.discountLimitation)
            setTimes(store.selectedDiscount?.times)
            setMinOrderSubTotalAmount(store.selectedDiscount?.minOrderSubTotalAmount)
            setMinOrderTotalAmount(store.selectedDiscount?.minOrderTotalAmount)
            setStatus(store.selectedDiscount?.status)
        }
    }, [store.selectedDiscount])

    const onSubmit = async (event) =>  {
        event.preventDefault()
        
        if (startTime === "" || endTime === "") {
            toast.warning(
                <ToastErrContent _content={"You must select date time of new Discount."} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return false
        }
        if ((new Date(startTime).getTime()) >= (new Date(endTime).getTime())) {
            toast.warning(
                <ToastErrContent _content={"Start Time is less than End Time."} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return false
        }
        if (usePercentage && (discountValue > 100.0 || discountValue === 0)) {
            toast.warning(
                <ToastErrContent _content={"Discount Precentage Value must be between 0 ~ 100 %."} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return false
        }
        if (!usePercentage && discountValue === 0) {
            toast.warning(
                <ToastErrContent _content={"Discount Value must be more than 0."} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            return false
        }
        
        let temp = new Date(startTime)
        const _startTime = new Date(temp.getTime() - (temp.getTimezoneOffset() * 60000)).toISOString()
        temp = new Date(endTime)
        const _endTime = new Date(temp.getTime() - (temp.getTimezoneOffset() * 60000)).toISOString()
        const putData = {
            title, 
            description, 
            discountType, 
            usePercentage, 
            discountValue, 
            useCouponCode, 
            couponCode : couponCode === "" ? null : couponCode,
            startTime : _startTime,
            endTime : _endTime,
            discountLimitation,
            times,
            minOrderSubTotalAmount,
            minOrderTotalAmount,
            status
        }
        const _id = store.selectedDiscount?._id
        dispatch(updateDiscount({ id: _id, putData }))
        
    }

    return (
        <Fragment>
            <Modal isOpen={open} toggle={toggleModal} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>Edit Discount Detail</h1>
                    <p>Edit Discount Detail</p>
                </div>
                <Row tag='form' className='gy-1 pt-75' onSubmit={onSubmit}>
                <Col md={6} xs={6}>
                        <Col md={12} xs={12}>
                            <Label className='form-label' for='title'>
                                Title
                            </Label>
                            <Input type='text' id='title' required name='title' value={title} onChange={e => {
                                setTitle(e.target.value)
                            }} />
                                
                        </Col> 
                        <Col md={12} xs={12} className="mt-1">
                            <Label className='form-label' for='description'>
                                Description
                            </Label>
                            <Input type='textarea' rows='3' required id='description' name='description' value={description} onChange={e => {
                                setDescription(e.target.value)
                            }} />
                                
                        </Col> 
                        <Col md={12} xs={12} className="mt-2">
                            <Label className='form-label' for='discountType'>
                                Discount Type
                            </Label>
                            <Input type='select' id='discountType' name='discountType' value={discountType} onChange={e => {
                                setDiscountType(e.target.value)
                            }}>
                                <option value="AssignedToProducts">Assigned To Products</option>
                                <option value="AssignedToOrderTotal" >Assigned To OrderTotal</option>
                                <option value="AssignedToOrderSubTotal" >Assigned To OrderSubTotal</option>
                            </Input>
                                
                        </Col> 
                        <Col md={12} xs={12}>
                            <div className='form-check form-check-inline mt-2'>
                                <Label for='usePercentage' className='form-check-label'>
                                    Use Percentage
                                </Label>
                                <Input type='checkbox' checked={usePercentage} onChange={e => setUsePercentage(e.target.checked)}  id='usePercentage' />
                            </div>
                        </Col>
                        <Col md={12} xs={12} className="mt-1">
                            <Label className='form-label' for='discountValue'>
                                {usePercentage ? "Discount Percetange" : "Discount Value"}
                            </Label>
                            <Input type='number' required id='discountValue' name='discountValue' value={discountValue} onChange={e => setDiscountValue(e.target.value)} />
                        </Col>
                        
                        <Col md={12} xs={12} >
                            <div className='form-check form-check-inline mt-2'>
                                <Label for='useCouponCode' className='form-check-label'>
                                    Use CouponCode
                                </Label>
                                <Input type='checkbox' checked={useCouponCode} onChange={e => setUseCouponCode(e.target.checked)}  id='useCouponCode' />
                            </div>
                        </Col>
                        {useCouponCode ? (<Col md={12} xs={12} className="mt-1">
                            <Label className='form-label' for='couponCode'>
                               Coupon Code
                            </Label>
                            <InputGroup>
                                <Input type='text' required readOnly id="couponCode" name='couponCode' value={couponCode}  />
                                    <Button color='primary' outline onClick={e => {
                                        e.preventDefault()
                                        getCouponCode()
                                    }}>
                                    Generate
                                    </Button>
                            </InputGroup>
                        </Col>) : ""}
                        
                    </Col>
                    <Col md={6} xs={6}>
                        <Col md={12} xs={12}>
                            <Label className='form-label' for='startTime'>
                                Start Time
                            </Label>
                            <Flatpickr
                                key="start_time"
                                value={startTime}
                                data-enable-time
                                id='startTime'
                                className='form-control'
                                onChange={date => {
                                    // console.log(new Date(date[0]).getTime())
                                    setStartTime(date[0])
                                }}
                            />
                        </Col>
                        <Col md={12} xs={12} className="mt-1">
                            <Label className='form-label' for='endTime'>
                                End Time
                            </Label>
                            <Flatpickr
                                key="end_time"
                                value={endTime}
                                data-enable-time
                                id='endTime'
                                className='form-control'
                                onChange={date => setEndTime(date[0])}
                            />
                                
                        </Col>
                        <Col md={12} xs={12} className="mt-3">
                            <Label className='form-label' for='discountLimiation'>
                                Discount Limitation
                            </Label>
                            <Input type='select' id='discountLimiation' name='discountLimiation' value={discountLimitation} onChange={e => {
                                setDiscountLimitation(e.target.value)
                            }}>
                                <option value="NtimesPerCustomer">N times Per Customer</option>
                                <option value="Unlimited" >Unlimited</option>
                            </Input>
                        </Col> 
                        {discountLimitation === "NtimesPerCustomer" ? (<Col md={12} xs={12} className="mt-1">
                            <Label className='form-label' for='times'>
                                N times
                            </Label>
                            <Input type='number' id='times' name='times' value={times} onChange={e => setTimes(e.target.value)} />
                        </Col>) : ""}
                        
                        
                        {discountType === "AssignedToOrderTotal" ? (<Col md={12} xs={12} className="mt-1">
                            <Label className='form-label' for='minOrderTotalAmount'>
                                Min Order Total Amount
                            </Label>
                            <Input type='number' id='minOrderTotalAmount' name='minOrderTotalAmount' value={minOrderTotalAmount} onChange={e => setMinOrderTotalAmount(e.target.value)} />
                        </Col>) : ""}
                        {discountType === "AssignedToOrderSubTotal" ? (<Col md={12} xs={12} className="mt-1">
                            <Label className='form-label' for='minOrderSubTotalAmount'>
                                Min Order SubTotal Amount
                            </Label>
                            <Input type='number' id='minOrderSubTotalAmount' name='minOrderSubTotalAmount' value={minOrderSubTotalAmount} onChange={e => setMinOrderSubTotalAmount(e.target.value)} />
                        </Col>) : ""}
                        <Col md={12} xs={12} className="mt-2">
                            <div className='form-check form-check-inline'>
                                <Label for='status' className='form-check-label'>
                                    Active
                                </Label>
                                <Input type='checkbox' checked={status} onChange={e => setStatus(e.target.checked)}  id='status' />
                            </div>
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
