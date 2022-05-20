import { Container, Col, Row } from 'react-bootstrap';
import PasswordResetForm from '../forms/PasswordResetForm';

function PasswordReset(){
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                    <PasswordResetForm />
                </Col>
            </Row>
        </Container>
    )
}

export default PasswordReset;
