'use client'
import {Container, Row, Col} from 'react-bootstrap';
import {CustomerRegisterForm} from '@/forms/CustomerRegisterForm'
import {GoogleButton} from '@/components/GoogleButton';
import formStyles from '@/styles/Form.module.css';
import Link from 'next/link';


// export const metadata: Metadata = {
//     title: "User Registration | PataSpare",
//     description: 'Register on Pataspare and access the best auto service there is.',
//     // verification: {"google-signin-client_id": "process.env.REACT_APP_CLIENT_ID"}
    
// }

const CustomerRegister =()=>{

    return (
        <Container>
        <Row className="justify-content-md-center">
            <Col lg={4}>
                <GoogleButton dcx='signup' />
            <div className={`dealer-register ${formStyles.Form}`} >
                <CustomerRegisterForm />
                <p className={`${formStyles.FormText}`}>By Signing up, you agree to our <Link href={`/terms`}>terms of service</Link> and <Link href={`/privacy`}>privacy policy</Link></p>
            </div>
            <p>Already have an account? <Link href='/auth/login'>Log in</Link></p>
            </Col>
        </Row>
        </Container>
    )
}

export default CustomerRegister;
