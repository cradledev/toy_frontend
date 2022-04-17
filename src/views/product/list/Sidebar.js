

import { useEffect, useState, useRef } from 'react'
// ** Third Party Components
import classnames from 'classnames'

import { useSelector } from 'react-redux'

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label } from 'reactstrap'

import { Tree } from "@minoru/react-dnd-treeview"


const Sidebar = props => {
  // ** Props
  const { sidebarOpen, dispatch, getAllData, getProducts, data } = props

  const store = useSelector(state => state.categories)

  const [treeData, setTreeData] = useState(store.allData)

  const ref = useRef(null)

  const handleOpenAll = () => ref.current.openAll()

  useEffect(() => {
    dispatch(getAllData())
    setTreeData(store.allData)
    handleOpenAll()
  }, [dispatch, store.allData?.length])
  useEffect(() => {
    handleOpenAll()
  }, [treeData])
  return (
    <div className='sidebar-detached sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}
        >
          <Row>
            <Col sm='12'>
              <h6 className='filter-heading d-none d-lg-block'>Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div id='product-categories'>
                <h4 className='mb-2'>Categories</h4>
                <div className='form-check' style={{marginLeft : '10px'}}>
                    <Input
                      type='radio'
                      id="all_production"
                      name='category-radio'
                      defaultChecked={true}
                    />
                    <Label className='form-check-label' for="all_production" onClick={() => {
                      const _params = data.params
                      dispatch(getProducts({ ..._params, category: null }))
                    }} >
                      All
                    </Label>
                </div>
                <Tree
                  tree={treeData}
                  {...props}
                  ref={ref}
                  rootId={null}
                  initialOpen = {true}
                  sort={false}
                  render={(category, { depth}) => (
                    <div style={{ marginLeft: depth * 3 }} className="pt-1 d-flex justify-content-between align-items-center">
                          <div className='form-check'>
                            <Input
                              type='radio'
                              id={category.id}
                              name='category-radio'
                            />
                            <Label className='form-check-label' for={category.id} onClick={() => {
                              const _params = data.params
                              dispatch(getProducts({ ..._params, category: category.id, page : 1 }))
                            }}>
                              {category.name}
                            </Label>
                          </div>
                    </div>
                  )}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
