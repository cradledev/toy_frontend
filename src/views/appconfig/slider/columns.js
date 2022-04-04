// ** React Imports


// ** Store & Actions
import { store } from '@store/store'
import { editSlider, deleteSlider} from '../store'

// ** Icons Imports
import { MoreVertical, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const endpoint = 'http://192.168.116.44:3001/api/v1'
// ** Renders Client Columns
export const columns = [
  {
    name: 'Image',
    sortable: false,
    minWidth: '300px',
    sortField: 'image',
    selector: row => row.image,
    cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
            <div className='d-flex flex-column'>
                <img src={`${endpoint}/config/sliderimage/${row.image}`} className="rounded img-fluid" width="200" height="100" />
            </div>
        </div>
    )
  },
  {
    name: 'title',
    sortable: true,
    minWidth: '230px',
    sortField: 'title',
    selector: row => row.title,
    cell: row => <span className='text-capitalize'>{row.title}</span>
  },
  {
    name: 'Order',
    minWidth: '100px',
    sortable: true,
    sortField: 'order',
    selector: row => row.order,
    cell: row => <span className='text-capitalize'>{row.order}</span>
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
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
              e.preventDefault()
              store.dispatch(editSlider({id : row._id, open : true}))
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
                store.dispatch(deleteSlider(row._id))
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
