import { Container, Card, Button } from 'react-bootstrap';
import { resendEmailAction } from '@/actions/auth';

const EmailSent = ()=>{

    return (
        <Container>
        <Card>
          <Card.Header as="h5">Verify Your Email Address</Card.Header>
          <Card.Body>
            <Card.Text>
              <p>Before proceeding , please check your email for a verification link.
              If you did not receive the email click below to request another.</p>
              <Button
              onClick={()=>{resendEmailAction()}}
              >Request another</Button>
            </Card.Text>
          </Card.Body>
        </Card>
        </Container>
    )
}

export default EmailSent;
