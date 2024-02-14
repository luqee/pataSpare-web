'use client'
import {Container, Row, Col} from 'react-bootstrap';
import {UserLoginForm} from '@/forms/UserLoginForm';
import {GoogleButton} from '@/components/GoogleButton';
import formStyles from '@/styles/Form.module.css';
import Link from 'next/link';

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
                <GoogleButton dcx={'signin'} />
                <div className={`user-login ${formStyles.Form}`}>
                    <UserLoginForm />
                </div>
                <p>Forgot password? <Link href='/auth/recovery'>Reset here</Link></p>
                <p>Don't have an account? <Link href='/auth/register'>Sign up</Link></p>
                </Col>
            </Row>
        </Container>
    )
}

export default UserLogin
