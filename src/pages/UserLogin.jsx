import UserLoginForm from '../forms/UserLoginForm';
import {Container, Row, Col} from 'react-bootstrap';
import {Helmet} from 'react-helmet';

function UserLogin(){
    return (
        <Container>
            <Helmet>
            <title>PataSpare - User Sign-in</title>
            <meta name="description" content="Login to your Pataspare customer account." />
            </Helmet>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                    <UserLoginForm />        
                </Col>
            </Row>
        </Container>
    )
}

export default UserLogin;
