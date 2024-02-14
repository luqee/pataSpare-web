'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Container, Row, Col} from 'react-bootstrap';

const Dash = ()=>{
    let path = usePathname()

    return (
        <Container>
            <Row>
                <Col>
                <p>Welcome to your dashboard. Here you can view your <Link href={`${path}/orders`}>orders</Link>, <Link href={`${path}/inquiries`}>inquiries</Link> and <Link href={`${path}/account`}>account</Link> information.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Dash;