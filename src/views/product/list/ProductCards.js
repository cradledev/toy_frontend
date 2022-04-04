// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

const endpoint = "http://192.168.116.44:3001/api/v1"
const ProductCards = props => {
  // ** Props
  const {
    products,
    dispatch,
    activeView,
    editProduct,
    deleteProduct
  } = props

  // ** Handle Move/Add to cart
  const handleEditProduct = (id) => {
    dispatch(editProduct({id, open : true}))
  }
  // ** Handle Wishlist item toggle
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id))
    // dispatch(getProducts(store.params))
  }

  // ** Renders products
  const renderProducts = () => {
    if (products.length > 0) {
      return products.map((item, key) => {
        const CartBtnTag = 'button'

        return (
          <Card className='ecommerce-card' key={key}>
            <div className='item-img text-center mx-auto'>
              <Link to={`/apps/ecommerce/product-detail/${item.slug}`}>
                <img className='img-fluid card-img-top' src={ `${endpoint}/products/image/${item.image}`} alt={item.name} />
              </Link>
            </div>
            <CardBody>
              <div className='item-wrapper'>
                <div className='item-rating'>
                  <ul className='unstyled-list list-inline'>
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className='ratings-list-item me-25'>
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.rating,
                              'unfilled-star': index + 1 > item.rating
                            })}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className='item-cost'>
                  <h6 className='item-price'>${item.price}</h6>
                </div>
              </div>
              <h6 className='item-name'>
                <Link className='text-body' to={`/apps/ecommerce/product-detail/${item.slug}`}>
                  {item.name}
                </Link>
                <CardText tag='span' className='item-company'>
                  Category : &nbsp;<label className='text-success'>{item.category?.name}</label>
                </CardText>
              </h6>
              <CardText className='item-description'>{item.description}</CardText>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>${item.price}</h4>
                    <CardText className='shipping'>
                      <Badge color='light-success'>Stock : {item.stock}</Badge>
                    </CardText>
                </div>
              </div>
              <Button
                className='btn-wishlist'
                color='light'
                onClick={() => handleDeleteProduct(item._id)}
              >
                <Trash
                  className={classnames('me-50', {
                    'text-danger': false
                  })}
                  size={14}
                />
                <span>Delete</span>
              </Button>
              <Button
                color='primary'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={() => handleEditProduct(item._id)}
                /*eslint-disable */
                // {...(item.isInCart
                //   ? {
                //       to: '/apps/ecommerce/checkout'
                //     }
                //   : {})}
                /*eslint-enable */
              >
                <Edit className='me-50' size={14} />
                <span>Edit</span>
              </Button>
            </div>
          </Card>
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default ProductCards
