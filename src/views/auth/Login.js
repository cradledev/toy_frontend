// ** React Imports
import { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import themeConfig from '@configs/themeConfig'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Third Party Components
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import {Coffee } from 'react-feather'
// ** Actions
import { handleLogin } from '@store/authentication'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { apiClient, getHomeRouteForLoggedInUser} from '@utils'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title fw-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to Toy Ecommerce. Now you can start to explore. Enjoy!</span>
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
const defaultValues = {
  password: 'admin',
  loginEmail: 'admin@demo.com'
}
const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const illustration = skin === 'dark' ? 'login-v2-dark.png' : 'login-v2.png',
    source = require(`@src/assets/images/pages/${illustration}`).default
  const [flag, setFlg] = useState(false)
  const onSubmit = data => {
    setFlg(true)
    if (Object.values(data).every(field => field.length > 0)) {
      apiClient.post("/auth/login", {email : data.loginEmail, password : data.password})
      .then(res => {
        // const {ok, user, token} = res
        const _result = res.data
        if (_result.ok) {
          if (_result.user.role === "SUPERADMIN" || _result.user.role === "ADMIN") {
            const data = { userData : _result.user, accessToken: _result.token}
            setFlg(false)
            localStorage.setItem("validToken", JSON.stringify(true))
            dispatch(handleLogin(data))
            return _result
          } else {
            setFlg(false)
            toast.warning(
              <ToastErrContent _content={"No permission to Admin Panel."} />,
              { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            throw new Error("wrong")
          }
          
        } else {
          setFlg(false)
          toast.error(
            <ToastErrContent _content={_result.msg} />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
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
        setFlg(false)
        console.log(err)
      })
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
      setFlg(false)
    }
  }
  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
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
              Welcome to Toy Ecommerce! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            
            <Form className='auth-login-form mt-2' onSubmit={e => {
              e.preventDefault()
              handleSubmit(onSubmit)()
            }}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  {/* <Link to='/pages/forgot-password-cover'>
                    <small>Forgot Password?</small>
                  </Link> */}
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' disabled={flag} color='primary' block>
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
