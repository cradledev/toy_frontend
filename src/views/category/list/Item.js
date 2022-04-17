
import { Link } from 'react-router-dom'
import { Fragment } from 'react'

// ** Reactstrap Imports
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
  } from 'reactstrap'
  
  // ** Third Party Components
  import {
    Edit,
    Trash,
    Plus,
    MoreVertical
} from 'react-feather'

import { store } from '@store/store'
import { deleteCategory, startDelete, editCategory, addStarting} from '../store'

const CategoryItem = ({ id }) => {
    return (
        <Fragment>
            <div className='d-flex flex-column'>
                <div className='column-action d-flex align-items-center'>
                    <UncontrolledDropdown>
                    <DropdownToggle tag='span'>
                        <MoreVertical size={17} className='cursor-pointer' />
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
                            e.preventDefault()
                            store.dispatch(addStarting({ id, open : true}))
                        }}>
                            <Plus size={14} className='me-50' />
                            <span className='align-middle'>Add New</span>
                        </DropdownItem>
                        <DropdownItem tag='a' href='/' onClick={e => {
                            e.preventDefault()
                            store.dispatch(editCategory({ id, open : true}))
                        }} className='w-100'>
                            <Edit size={14} className='me-50' />
                            <span className='align-middle'>Edit</span>
                        </DropdownItem>
                        <DropdownItem
                            tag='a'
                            href='/'
                            className='w-100'
                            onClick={e => {
                                e.preventDefault()
                                if (confirm("Are you want to procedd next action?")) { 
                                    store.dispatch(startDelete({ deleteStatus : true}))
                                    store.dispatch(deleteCategory(id))
                                }
                                
                            }}
                        >
                            <Trash size={14} className='me-50' />
                            <span className='align-middle'>Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                
            </div>
        </Fragment>
    )
}

export default CategoryItem