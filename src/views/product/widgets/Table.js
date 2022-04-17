// ** React Imports
import { Fragment} from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown} from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleStatusChange, status }) => {
  // ** Converts table to CSV
  
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col xl='6' className='d-flex align-items-center justify-content-xl-end p-0'>
            <div className='d-flex align-items-center table-header-actions'>
                <div className='me-1 d-flex align-items-center'>
                    <Label className='mb-0' for='status-select'>Status</Label>
                    <Input
                        className='mx-50'
                        type='select'
                        id='status-select'
                        value={status}
                        onChange={handleStatusChange}
                        style={{ width: '10rem' }}
                    >
                        <option value='empty'>Select Status</option>
                        <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                    </Input>
                </div>
            </div>
        </Col>
      </Row>
    </div>
  )
}

const ProductTable = props => {

    const {store, dispatch, getProducts} = props
    // ** States
    

    // ** Function in get data on page change
    const handlePagination = page => {
        dispatch(
            getProducts({...store.params, page : page.selected + 1})
        )
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        dispatch(
            getProducts({...store.params, perPage : value})
        )
    }

    const handleStatusChange = e => {
        const value = e.currentTarget.value
        dispatch(
            getProducts({...store.params, status : value})
        )
    }
    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(Math.ceil(store.totalProducts / store.params.perPage))
        return (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            pageCount={count || 1}
            activeClassName='active'
            forcePage={store.params.page !== 0 ? store.params.page - 1 : 0}
            onPageChange={page => handlePagination(page)}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
        )
    }

    // ** Table data to render
    const dataToRender = () => {
        if (store.products?.length > 0) {
            return store.products
        } else  {
            return []
        }
    }

    const handleSort = (column, sortDirection) => {
        dispatch(
            getProducts({...store.params, sort : sortDirection, sortColumn : column.sortField})
        )
    }

    return (
        <Fragment>
            <Card className='overflow-hidden mt-1'>
                <div className='react-dataTable'>
                <DataTable
                    noHeader
                    subHeader
                    sortServer
                    pagination
                    responsive
                    paginationServer
                    columns={columns}
                    onSort={handleSort}
                    sortIcon={<ChevronDown />}
                    className='react-dataTable'
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                    subHeaderComponent={
                    <CustomHeader
                        rowsPerPage={store.params.perPage}
                        handlePerPage={handlePerPage}
                        dispatch={dispatch}
                        status={store.params.status}
                        handleStatusChange={handleStatusChange}
                    />
                    }
                />
                </div>
            </Card>
        </Fragment>
    )
}

export default ProductTable
