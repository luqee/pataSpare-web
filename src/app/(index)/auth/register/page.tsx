import {Container, Row, Col} from 'react-bootstrap';
import {CustomerRegisterForm} from '@/forms/CustomerRegisterForm'
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
            <div className={formStyles.Form} >
                <CustomerRegisterForm />
                <p className={formStyles.FormText}>By Signing up, you agree to our <Link href={`/terms`}>terms of service</Link> and <Link href={`/privacy`}>privacy policy</Link></p>
                <p className={formStyles.FormText}>Already have an account? <Link href='/auth/login'>Log in</Link></p>
            </div>
            </Col>
        </Row>
        </Container>
    )
}

export default CustomerRegister;
