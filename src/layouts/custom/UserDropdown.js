// ** React Imports
import { Link, useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn, apiClient } from '@utils'

import useJwt from '@src/auth/jwt/useJwt'

import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'
// ** Third Party Components

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import {  Power } from 'react-feather'
// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  // ** State
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar
  const onLogout = () => {
    const token = JSON.parse(localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName))
    const config = {
      headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
    }
    apiClient.post("/auth/logout", {}, config)
    .then(res => {
      if (res.data.ok) {
        localStorage.setItem("validToken", JSON.stringify(false))
        dispatch(handleLogout("logout"))
        return true
      } else {
        throw new Error("wrong")
      }
      
    })
    .then(res => {
      console.log(res)
      history.push('/login')
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{ userData && (userData.firstname + userData.lastname)}</span>
          <span className='user-status'>{(userData && userData.role) || 'Admin'}</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/login' onClick={onLogout}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
