import {Container, Row, Col } from 'react-bootstrap';
import {Helmet} from 'react-helmet';
import CustomerRegisterForm from '../forms/CustomerRegisterForm';

function CustomerRegister(){
    return (
        <Container>
            <Helmet>
                <title>User Registration | PataSpare</title>
                <meta name="description" content="Register on Pataspare and access the best auto service in Kenya." />
            </Helmet>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                    <CustomerRegisterForm />
                </Col>
            </Row>
        </Container>
    )
}

export default CustomerRegister;
