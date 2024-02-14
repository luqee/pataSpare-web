'use client'
import {useState} from 'react'
import { Container, Card, Button } from 'react-bootstrap';
import { getEmailResend } from '@/utils/api'
import { useRouter, useSearchParams } from 'next/navigation';

const EmailSent = ()=>{
    const [isLoading, setLoading] = useState(false);
    const params = useSearchParams()
    const router = useRouter()

  const handleClick = () => {
    setLoading(true)
    getEmailResend(params.toString())
	.then(response => {
        setLoading(false);
		if (response.status === 200) {
            router.refresh()
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
              onClick={handleClick}
              disabled={isLoading}
              >{isLoading ? 'Loading…' : 'Request another'}</Button>
            </Card.Text>
          </Card.Body>
        </Card>
        </Container>
    )
}

export default EmailSent;
