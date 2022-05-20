import { Container, Row, Col } from "react-bootstrap";
import MakeOrderForm from "../../forms/MakeOrderForm";

function OrderCreate(){
    return (
        <Container>
            <Row>
                <Col>
                <MakeOrderForm />
                </Col>
            </Row>
        </Container>
    )
}
export default OrderCreate