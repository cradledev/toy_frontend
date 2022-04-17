// ** React Imports


// ** Store & Actions
import { store } from '@store/store'
import { editDiscount, deleteDiscount} from './store'

// ** Icons Imports
import { MoreVertical, Trash2, Archive } from 'react-feather'

// import {formatDateToMonthShort} from '@utils'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// const renderDate = row => {
  
//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${roleObj[row.role.toLowerCase()] ? roleObj[row.role.toLowerCase()].class : ''} me-50`} />
//       {text}
//     </span>
//   )
// }
// ** Renders Client Columns
export const columns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '50px',
    sortField: 'title',
    selector: row => row.title,
    cell: row => (
        <span>{row.title}</span>
    )
  },
  {
    name: 'Discount Type',
    sortable: true,
    minWidth: '200px',
    sortField: 'discountType',
    selector: row => row.discountType,
    cell: row => <span>{row.discountType}</span>
  },
  {
    name: 'Coupon Code',
    minWidth: '50px',
    sortable: true,
    sortField: 'couponCode',
    selector: row => row.couponCode,
    cell: row => <span>{row.couponCode}</span>
  },
  {
    name: 'Discount',
    minWidth: '50px',
    sortable: true,
    sortField: 'discountValue',
    selector: row => row.discountValue,
    cell: row => <span>{row.discountValue} {row.usePercentage ? "%" : "\$"}</span>
  },
  {
    name: 'Start Date',
    minWidth: '150px',
    sortable: true,
    sortField: 'startTime',
    selector: row => row.startTime,
    cell: row => <span>{new Date(new Date(row.startTime).getTime() + (new Date(row.startTime).getTimezoneOffset() * 60000)).toLocaleString("en-CA", {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: true, minute:'2-digit', second:'2-digit'})}</span>
  },
  {
    name: 'End Date',
    minWidth: '150px',
    sortable: true,
    sortField: 'endTime',
    selector: row => row.endTime,
    cell: row => <span>{new Date(new Date(row.endTime).getTime() + (new Date(row.endTime).getTimezoneOffset() * 60000)).toLocaleString("en-CA", {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: true, minute:'2-digit', second:'2-digit'})}</span>
  },
  {
    name: 'Times Used',
    minWidth: '50px',
    sortable: true,
    sortField: 'timesUsed',
    selector: row => row.timesUsed,
    cell: row => <span>{row.timesUsed}</span>
  },
  {
    name: 'Status',
    minWidth: '50px',
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
    minWidth: '50px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
              e.preventDefault()
              store.dispatch(editDiscount({id : row._id, open : true}))
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
                store.dispatch(deleteDiscount({id : row._id, flag : !row.status}))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Active/DeActive</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
