import { useState } from "react"
import { Container, Card, Button } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { resendEmail } from "../api/auth"

function EmailSent() {
  const [isLoading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const handleClick = () => {
    setLoading(true)
    resendEmail(location.state.email, (data)=>{
      if (data.status === 200) {
        setLoading(false)
        navigate("/auth/email", {replace: true, state: location.state})
        
      }
    })
  }
  return (
    <Container>
      <Card>
        <Card.Header as="h5">Verify Your Email Address</Card.Header>
        <Card.Body>
          <Card.Text>
            <p>
              Before proceeding , please check your email for a verification
              link. If you did not receive the email click below to request
              another.
            </p>
            <Button
              onClick={!isLoading ? handleClick : null}
              disabled={isLoading}
            >
              {isLoading ? "Loading…" : "Request another"}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default EmailSent
