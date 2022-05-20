import {Container, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';

function Dash(){
    return (
        <Container>
            <Helmet>
            <title>PataSpare - User dashboard</title>
            <meta name="description" content="Keep track of your orders and enquiries." />
            </Helmet>
            <Row>
                <Col>
                <p>Welcome to your dashboard. Here you can view your <Link to={`orders`}>orders</Link>, <Link to={`inquiries`}>inquiries</Link> and <Link to={`account`}>account</Link> information.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Dash;