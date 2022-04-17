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
import { addCategory, addStarting} from '../store'

import {apiClient} from '@utils'

const AddCategoryModal = ({open, toggleModal}) => {
    // ** States
    const [categoryname, setCategoryname] = useState("")
    const [parent, setParent] = useState("empty")
    const [data, setData] = useState([])

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
        setData(store.allData)
        if (!store.addStatus) {
            setCategoryname("")
            setParent("empty")
            setData([])
            setImage({ preview: "", raw: "" })
        }
    }, [dispatch, store.addStatus])
   
    const onSubmit = async () => {
        if (image.raw) {
            console.log(1)
            const formData = new FormData()
            if (parent !== "empty") {
                formData.append("parent", parent)
            }
            formData.append("category_name", categoryname)
            formData.append("image", image.raw)
            await apiClient.post("/categories/", formData, { headers : {
                "content-type": "multipart/form-data",
                Accept: '*/*'
               }
            })
            dispatch(addStarting({id : 1, open : false}))
        } else {
            console.log(2)
            if (parent === "empty") {
                dispatch(addCategory({category_name : categoryname }))
            } else {
                dispatch(addCategory({category_name : categoryname, parent }))
            }
        }
    }

    return (
        <Fragment>
        <Modal
            isOpen={open}
            toggle={toggleModal}
            className='modal-dialog-centered modal-lg'
        >
            <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
            <h1 className='text-center mb-1'>Add New Category</h1>
            <p className='text-center'>Add new product category</p>
            <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={e => {
                e.preventDefault()
                onSubmit()
            }}>
                <Col md={6} className='text-center d-flex align-items-center' xs={6}>
                    <Label className='form-label cursor-pointer' htmlFor='upload-button'>
                        { image.preview ? <div className='item-img text-center mx-auto' style={{width: "250px", Height : "250px"}}>
                            <img className='card-img-top' style={{width: "250px", Height : "250px"}} src={ image.preview } alt="image" />
                        </div> : <h3>Select the image of new Category.</h3>}
                        
                    </Label>
                    <input
                        type="file"
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={6} xs={6} >
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
