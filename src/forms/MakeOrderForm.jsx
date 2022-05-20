import { Fragment, useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css'
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CartContext, UserContext } from '../App';
import { placeOrder } from '../api/cart';
import { useNavigate } from 'react-router-dom';

const rePhoneNumber = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/;

function MakeOrderForm() {
    let [loading, setLoading] = useState(false)
    const userContext = useContext(UserContext)
    const cartContext = useContext(CartContext)
    const navigate = useNavigate()

    const makeOrder = (values, actions) => {
        actions.setSubmitting(true)
        setLoading(true)
        let details = {
            number: values.number,
        }
        placeOrder(userContext.user, cartContext.cart, details, (order) => {
            if(order){
                setLoading(false)
                actions.setSubmitting(false)
                cartContext.updateCart({})
                navigate(`/customer/orders/${order.id}`, {state: order})
            }
        })
    }
    return (
        <Fragment>
            <Loader loading={loading} />
            <Formik
                validationSchema={Yup.object().shape({
                    number: Yup.string()
                      .matches(rePhoneNumber, 'Phone number is not valid')
                      .required('Required field'),
                  })}
                initialValues={{
                    number: '',
                }}
                onSubmit={makeOrder}
                render={({
                    values,
                    setFieldValue,
                    errors, 
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                }) =>(
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="number">
                        <Form.Label>Phone Number:</Form.Label>
                        <PhoneInput style={{
                            width: '100%'
                        }} defaultCountry={'ke'} value={values.number} onChange={(value) => {
                            setFieldValue('number', value)
                        }} />
                        <ErrorMessage name="number" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        SUBMIT
                        </Button>
                    </Form>
                )}
            />
        </Fragment>
    )
}

export default MakeOrderForm;