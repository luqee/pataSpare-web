import { Container, Col, Row } from 'react-bootstrap';
import PasswordRequestForm from '../forms/PasswordRequestForm';

function Recovery() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                    <PasswordRequestForm />
                </Col>
            </Row>
        </Container>
    )
}

export default Recovery;
