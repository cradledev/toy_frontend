import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import { Link } from 'react-router-dom'
const ProductList = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Toy Ecommerce 🚀</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>All the best for your new project.</CardText>
          <CardText>
            Please make sure to read our{' '}
            <CardLink
              to='/' tag={Link}
            >
              Template Documentation
            </CardLink>{' '}
            to understand where to go from here and how to use our template.
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default ProductList
