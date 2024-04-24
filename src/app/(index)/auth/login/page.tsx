import {Container, Row, Col} from 'react-bootstrap';
import {UserLoginForm} from '@/forms/UserLoginForm';

// export const metadata: Metadata = {
//     title: "PataSpare - User Sign-in",
//     description: 'Login to your Pataspare account.',
//     // verification: {"google-signin-client_id": "process.env.REACT_APP_CLIENT_ID"}
    
// }

const UserLogin = ()=> {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                <UserLoginForm />
                </Col>
            </Row>
        </Container>
    )
}

export default UserLogin
