import React from 'react'
import { Container, Col, Card } from 'react-bootstrap';

function EmailSent(props) {
    return (
        <Container>
        <Card>
          <Card.Header as="h5">Verify Your Email Address</Card.Header>
          <Card.Body>
            <Card.Text>
              <p>Before proceeding , please check your email for a verification link.
              If you did not receive the email click here to request another.</p>
            </Card.Text>
          </Card.Body>
        </Card>
        </Container>
    )
}

export default EmailSent;
