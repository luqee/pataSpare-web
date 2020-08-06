import React, {useState} from 'react'
import { Container, Card, Button } from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';

function EmailSent(props) {
  const [isLoading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true)
	// let postData = {email: props.location.state.mail};
	console.log(props);
	
	autoAPI.get(`${urls.emailResend}?email=${props.location.state.email}`)
	.then(response => {
		if (response.data.status === 200) {
			setLoading(false);
			let loc = {pathname: '/auth/email',state: {email: props.location.state.email}}
			this.props.history.push('');
			this.props.history.push(loc);
		}
	})
	.catch((error) => {
		setLoading(false);
	});
  }
    return (
        <Container>
        <Card>
          <Card.Header as="h5">Verify Your Email Address</Card.Header>
          <Card.Body>
            <Card.Text>
              <p>Before proceeding , please check your email for a verification link.
              If you did not receive the email click below to request another.</p>
              <Button
              onClick={!isLoading ? handleClick : null}
              disabled={isLoading}
              >{isLoading ? 'Loading…' : 'Request another'}</Button>
            </Card.Text>
          </Card.Body>
        </Card>
        </Container>
    )
}

export default EmailSent;
