// ** React Imports
import { Fragment, useEffect, useState } from 'react'

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

import { useSelector, useDispatch } from 'react-redux'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { updateUser } from '../store'

const EditUserModal = ({open, toggleModal}) => {
  // ** States
  const [bio, setBio] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState(false)
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)
  useEffect(() => {
    if (store.selectedUser) {
      setFirstname(store.selectedUser?.firstname)
      setLastname(store.selectedUser?.lastname)
      setEmail(store.selectedUser?.email)
      setRole(store.selectedUser?.role)
      setStatus(store.selectedUser?.status)
      setBio(store.selectedUser?.bio)
    }
    
    
  }, [dispatch, store.selectedUser])

  const onSubmit = () => {
    const postData = {firstname, lastname, email, role : role.toUpperCase(), status, bio}
    
    const _id = store.selectedUser?._id
    dispatch(updateUser({ id: _id, putData : postData}))
  }

  return (
    <Fragment>
      <Modal isOpen={open} toggle={toggleModal} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={e => {
              e.preventDefault()
              onSubmit()
          }}>
            <Col md={6} xs={12}>
                <Label className='form-label' for='firstname'>
                    First Name
                </Label>
                <Input
                    type='text'
                    id='firstname'
                    name='firstname'
                    placeholder='John'
                    value={firstname}
                    onChange={e => {
                        setFirstname(e.target.value)
                    }}
                    required
                />
            </Col>
            <Col md={6} xs={12}>
                <Label className='form-label' for='lastname'>
                    Last Name
                </Label>
                <Input
                    type='text'
                    id='lastname'
                    name='lastname'
                    placeholder='Doe'
                    value={lastname}
                    onChange={e => {
                        setLastname(e.target.value)
                    }}
                    required
                />
            </Col>
            
            <Col md={6} xs={12}>
                <Label className='form-label' for='email'>
                Email
                </Label>
                <Input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='test@test.com'
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                    required
                />
              
            </Col>
            <Col md={6} xs={12}>
                <Label className='form-label' for='role'>
                    Select Role
                </Label>
                <Input type='select' id='role' name='role' value={role} onChange={e => {
                    setRole(e.target.value)
                }}>
                    <option value='USER'>User</option>
                    <option value='ADMIN'>Admin</option>
                    <option value='SUPERADMIN'>Super Admin</option>
                </Input>
            </Col>
            <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                    Select Status
                </Label>
                <Input type='select' id='status' name='status' value={status} onChange={e => {
                    setStatus(e.target.value)
                }}>
                    <option value={true}>Active</option>
                    <option value={false} >InActive</option>
                </Input>
            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='tax-id'>
                Bio
              </Label>
              <Input id='bio' name='bio' type='textarea' rows='3' value={bio} onChange={e => {
                  setBio(e.target.value)
              }} placeholder='Bio text is here' />
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='primary'>
                Submit
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

export default EditUserModal
