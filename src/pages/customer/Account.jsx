import {useContext} from 'react';
import { Formik } from 'formik';
import {Container, Row, Col, Form} from 'react-bootstrap';
import { UserContext } from '../../App';

function Account(props){
    let userContext = useContext(UserContext)
    let intialState = {
        username: userContext.user.name,
        email: userContext.user.email,
    }
    
    return (
        <Container>
            <Row>
                <Col>
                <p>Account Information</p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                <div className='dealer-register'>
                    <Formik
                        initialValues={intialState}
                        render={({
                            values,
                            setFieldValue,
                            errors, 
                            dirty,
                            isSubmitting,
                            handleSubmit,
                        })=>(
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control disabled={true} name="username" type="text" value={values.username} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control disabled={true} type="email" value={values.email} />
                            </Form.Group>
                            </Form>
                        )}
                    />
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Account;