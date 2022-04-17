// ** React Imports


// ** Store & Actions
import { store } from '@store/store'
import { editProduct, deleteProduct, asRecommend} from '../store'

// ** Icons Imports
import { MoreVertical, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const endpoint = 'http://192.168.116.44:3001/api/v1'

// ** Renders Role Columns
const renderEvents = row => {
  const _events = row.events
  return (
     _events.map((element, index) => {
      return (
        // eslint-disable-next-line prefer-template
        <Badge key={index + "events"} className='text-capitalize' color='light-success' pill={true}>
          {element.title}
        </Badge>
      )
    })
    
  )
}
// ** Renders Client Columns
export const columns = [
  {
    name: 'Image',
    sortable: false,
    minWidth: '100px',
    sortField: 'image',
    selector: row => row.image,
    cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
            <div className='d-flex flex-column'>
                <img src={`${endpoint}/products/image/${row.image}`} className="rounded" width="100" height="100" />
            </div>
        </div>
    )
  },
  {
    name: 'Name',
    sortable: true,
    minWidth: '100px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => <span className='text-capitalize'>{row.name}</span>
  },
  {
    name: 'Price',
    minWidth: '50px',
    sortable: true,
    sortField: 'price',
    selector: row => row.price,
    cell: row => <span className='text-capitalize'>{row.price}</span>
  },
  {
    name: 'Stock',
    minWidth: '50px',
    sortable: true,
    sortField: 'stock',
    selector: row => row.stock,
    cell: row => <span className='text-capitalize'>{row.stock}</span>
  },
  {
    name: 'Discount Actions',
    minWidth: '50px',
    sortable: true,
    sortField: 'events',
    selector: row => row.events,
    cell: row => renderEvents(row)
  },
  {
    name: 'As Recommend',
    minWidth: '30px',
    sortable: true,
    sortField: 'recommend',
    selector: row => row.recommend,
    cell: row => (
      // eslint-disable-next-line prefer-template
      <Badge key={row._id + "recommend"} className='text-capitalize' color={row.recommend ? 'light-success' : 'light-secondary'} pill={true}>
        {row.recommend ? "Recommended" : ""}
      </Badge>
    )
  },
  {
    name: 'Status',
    minWidth: '30px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      // eslint-disable-next-line prefer-template
      <Badge key={row._id + "status"} className='text-capitalize' color={row.status ? 'light-success' : 'light-secondary'} pill={true}>
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
              store.dispatch(editProduct({id : row._id, open : true}))
            }}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
              e.preventDefault()
              if (confirm("Are you want to proceed this action?")) {
                store.dispatch(asRecommend({id : row._id, flag : !row.recommend}))
              }
              
            }}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>As Recommend</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                if (confirm("Are you want to procedd next action?")) {
                  store.dispatch(deleteProduct({id : row._id, flag : !row.status}))
                }
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
