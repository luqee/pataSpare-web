'use client'
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {MakeOrderForm} from "@/forms/MakeOrderForm"
import Loader from "@/components/Loader";
import { useCartContext} from '@/context/CartContext'
import { useRouter } from "next/navigation"

const CreateOrder = ()=>{
    const {cart, updateCart} = useCartContext()
    let [loading, setLoading] = useState(false)
    const router =  useRouter()

    const makeOrder = (details) => {
        setLoading(true)
        let postData = {
            cart: cart,
            details: details
        }
        postOrders(postData)
        .then((response) => {
            setLoading(false)
            if (response.status === 201){
                updateCart({})
                let order = response.data.data.order
                router.push(`/customer/orders/${order.id}`)
            }
        })
        .catch((error) => {
            setLoading(false)
            console.log(error)
        })
    }

    return (
        <Container>
            <Row>
                <Col>
                <Loader loading={loading} />
                <MakeOrderForm makeOrder={makeOrder}/>
                </Col>
            </Row>
        </Container>
    )
}
export default CreateOrder