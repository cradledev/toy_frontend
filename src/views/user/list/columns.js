// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'


// ** Store & Actions
import { store } from '@store/store'
import { deleteUser, editUser, startDelete} from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.avatar?.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color || 'primary'} className='me-1' content={row.fullName || 'John Doe'} initials />
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    user: {
      class: 'text-primary',
      icon: User
    },
    superadmin: {
      class: 'text-success',
      icon: Database
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }
  const Icon = roleObj[row.role.toLowerCase()] ? roleObj[row.role.toLowerCase()].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
}
export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'firstname',
    selector: row => row.firstname,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          {/* <Link
            to={`/apps/user/view/${row._id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row._id))}
          > */}
          <Link
            tag='a'
            to='/'
            className='user_name text-truncate text-body'
            onClick={(e) => e.preventDefault()}
          >
            <span className='fw-bolder'>{row.firstname + row.lastname}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.role,
    cell: row => renderRole(row)
  },
  {
    name: 'Bio',
    minWidth: '230px',
    sortable: true,
    sortField: 'bio',
    selector: row => row.bio,
    cell: row => <span className='text-capitalize'>{row.bio}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={row.status ? 'light-success' : 'light-secondary'} pill={true}>
        {row.status ? "Active" : "InActive"}
      </Badge>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/user/view/${row._id}`}
              onClick={() => store.dispatch(getUser(row._id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem> */}
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
              e.preventDefault()
              store.dispatch(editUser({id : row._id, open : true}))
            }}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(startDelete({ deleteStatus : true}))
                store.dispatch(deleteUser(row._id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
