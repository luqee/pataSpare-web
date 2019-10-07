import React, {useState}from 'react'
import {Container,Row, Col, Image, Button, Form} from 'react-bootstrap';

function InquiryView(props){
    const [inquiry, setInquiry] = useState(props.location.state.inquiry)
    const sendReply = () => {
        console.log(`sending inquiry reply`);
    }
    return <Container>
        <Row style={{
            flexDirection: `column`
        }}>
            <Col>
            <p>{inquiry.query}</p>
            </Col>
            <Col style={{
                display: `flex`,
                flexDirection:`column`
            }}>
            <p>Request for:</p>
            {
                (inquiry.part === null) ? '-' 
                : <Image src={inquiry.part.part_image} width={'50px'} height={'50px'}></Image>
            }
            {
                (inquiry.part === null) ? '-' 
                : inquiry.part.name
            }
            <Image src={inquiry.shop.shop_image} width={'50px'} height={'50px'}></Image>
            {inquiry.shop.name}
            <span>Time: {inquiry.created_at}</span>
            </Col>
            <Col>
            <p>Replies(number)</p>
            <div className={`replies`}>
                {inquiry.replies}
            </div>
            </Col>
            <Col>
            <Form>
                <Form.Group controlId="formBasicReply">
                <Form.Label>New Reply</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Write a reply.." onChange={(event) => setInquiry(event.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={sendReply}>
                SEND
                </Button>
            </Form>
            </Col>
        </Row>
    </Container>
}

export default InquiryView;
