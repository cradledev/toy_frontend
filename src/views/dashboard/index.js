import { Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import CardCongratulations from './CardCongratulations'
const Dashboard = () => {
  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='12' sm='12'>
          <CardCongratulations />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
