// ** React Imports
import { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

import themeConfig from '@configs/themeConfig'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import {Coffee } from 'react-feather'

import { apiClient, getHomeRouteForLoggedInUser} from '@utils'
import { toast, Slide } from 'react-toastify'
// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Label, Button, Form, Input, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'


const defaultValues = {
  email: '',
  terms: false,
  firstname: '',
  lastname : '',
  passwordConfirm : '',
  password: ''
}
const ToastContent = ({ name, role }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          <h6 className='toast-title fw-bold'>Welcome, {name}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>You have successfully Registered in as an {role} user to Toy Ecommerce. Now you can start to explore. Enjoy!</span>
      </div>
    </Fragment>
)
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

const Register = () => {
  // ** Hooks
  const { skin } = useSkin()
  const history = useHistory()
  const [flag, setFlag] = useState(false)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const illustration = skin === 'dark' ? 'register-v2-dark.png' : 'register-v2.png',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = data => {
    setFlag(true)
    const tempData = { ...data }
    delete tempData.terms
    if (Object.values(tempData).every(field => field.length > 0) && data.terms === true) {
        if (data.password !== data.passwordConfirm) {
            toast.warn(
                <ToastErrContent _content={"Password is not same. Please try again."} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            setFlag(false)
        } else {
            const { firstname, lastname, email, password } = data
            apiClient.post('/auth/signup', { firstname, lastname, email, password })
            .then(result => {
                if (result.data.ok) {
                    return result.data
                } else {
                    setFlag(false)
                    toast.warn(
                    <ToastErrContent _content={result.data.err} />,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 3500 }
                    )
                    throw new Error("wrong")
                }
            })
            .then(_result => {
                history.push(getHomeRouteForLoggedInUser(_result.user.role))
                toast.success(
                <ToastContent name={_result.user.firstname + _result.user.lastname} role={_result.user.role} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
            })
            .catch(err => {
              console.log(err)
              toast.error(
                <ToastErrContent _content={"Sorry, Sir. Error is occured. Please try again some mins later."} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
              )
              setFlag(false)
            })
        }
    } else {
        for (const key in data) {
            if (data[key].length === 0) {
                setError(key, {
                type: 'manual',
                message: `Please enter a valid ${key}`
                })
            }
            if (key === 'terms' && data.terms === false) {
                setError('terms', {
                type: 'manual'
                })
            }
        }
        setFlag(false)
    }
    
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img src={themeConfig.app.appLogoImage} height="30" alt='logo' />
          <h2 className='brand-text text-primary ms-1'>Toy Ecommerce</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5 border-start' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>
            <CardText className='mb-2'>Make your app management easy and fun!</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='register-username'>
                  Fristname
                </Label>
                <Controller
                  id='firstname'
                  name='firstname'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='john' invalid={errors.firstname && true} {...field} />
                  )}
                />
                {errors.firstname ? <FormFeedback>{errors.firstname.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-username'>
                  Lastname
                </Label>
                <Controller
                  id='lastname'
                  name='lastname'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='doe' invalid={errors.lastname && true} {...field} />
                  )}
                />
                {errors.lastname ? <FormFeedback>{errors.lastname.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input type='email' placeholder='john@example.com' invalid={errors.email && true} {...field} />
                  )}
                />
                {errors.email ? <FormFeedback>{errors.email.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  Password Confirm
                </Label>
                <Controller
                  id='passwordConfirm'
                  name='passwordConfirm'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.passwordConfirm && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Controller
                  name='terms'
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id='terms' type='checkbox' checked={field.value} invalid={errors.terms && true} />
                  )}
                />
                <Label className='form-check-label' for='terms'>
                  I agree to
                  <a className='ms-25' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </a>
                </Label>
              </div>
              <Button type='submit' disabled={flag} block color='primary'>
                Sign up
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
