import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MakeOrderForm from "../../forms/MakeOrderForm";
import CartService from "../../api/cart";
import Loader from "../Loader";

function CreateOrder(props){
    let [cart] = useState(props.location.state.cart)
    let [user] = useState(props.location.state.user)
    let [cartContext] = useState(props.cartContext)
    let [loading, setLoading] = useState(false)
    const cartService = new CartService();
    const makeOrder = (details) => {
        setLoading(true)
        cartService.placeOrder(user, cart, details, (order) => {
            if(order){
                setLoading(false)
                cartContext.updateCart({})
                let path = {
                    pathname: `/customer/orders/${order.id}`,
                    state: {order: order}
                }
                props.history.push(path)
            }
        });
    }
    return (
        <Container>
            <Row>
                <Col>
                <Loader loading={loading} />
                <MakeOrderForm onSubmit={makeOrder}/>
                </Col>
            </Row>
        </Container>
    )
}
export default CreateOrder