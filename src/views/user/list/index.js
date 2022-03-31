// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

import { useDispatch, useSelector } from 'react-redux'
// ** Styles
import '@styles/react/apps/app-users.scss'
import { useEffect, useState } from 'react'

const UsersList = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)
  
  const [activeUsers, setActiveUsers] = useState(0)
  const [inActiveUsers, setInActiveUsers] = useState(0)
  useEffect(() => {
    let _temp = store.allData.filter(el => el._id === true)
    if (_temp.length !== 0) {
      setActiveUsers(_temp[0].number)
    } else {
      setActiveUsers(0)
    }
    _temp = store.allData.filter(el => el._id === false)
    if (_temp.length !== 0) {
      setInActiveUsers(_temp[0].number)
    } else {
      setInActiveUsers(0)
    }
  }, [dispatch, store.data?.length])
  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='4' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Users'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{activeUsers + inActiveUsers}</h3>}
          />
        </Col>
        {/* <Col lg='4' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='Paid Users'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>4,567</h3>}
          />
        </Col> */}
        <Col lg='4' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Active Users'
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{activeUsers}</h3>}
          />
        </Col>
        <Col lg='4' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='InActive Users'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{inActiveUsers}</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default UsersList
