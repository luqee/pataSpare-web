import React, {useState}from 'react'
import {Container,Row, Col, Image, Button, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import autoAPI from '../api/api';
import urls from '../config/config';

function InquiryView(props){
    const [inquiry, setInquiry] = useState(props.location.state.inquiry)
    const [reply, setReply] = useState('')
    let [submitting, setSubmitting] = useState(false)
    let totalReplies = 0
    if(inquiry.replies && inquiry.replies.length > 0){
        totalReplies = inquiry.replies.length
    }
    const fetchInquiry = () => {
        console.log(`fetching inquiry`);
        autoAPI.get(`/inquiries/${inquiry.id}`,{
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            if(response.status === 200){
                setInquiry(response.data.data.inquiry)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    const sendReply = (event) => {
        event.preventDefault()
        setSubmitting(true)
        console.log(`sending inquiry reply`);
        autoAPI.post(`/inquiries/${inquiry.id}/replies`, JSON.stringify({reply: reply}), {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            if(response.status === 201){
                setSubmitting(false)
                setReply('')
                fetchInquiry()
                // setInquiry(response.data.data.inquiry)
            }
        })
        .catch((error) => {
            console.log(error)
            setSubmitting(false)
        })
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
            <p>Request for:</p><br />
            {
                (!inquiry.part) ? ''
                : <Image src={`${urls.hostRoot}/${inquiry.part.part_image}`} width={'75px'} height={'75px'} />
            }
            <br />
            {
                (inquiry.part === null) ? ''
                : inquiry.part.title
            }
            <br /><br />
            <Image src={`${urls.hostRoot}/${inquiry.shop.shop_image}`} width={'75px'} height={'75px'} />
            <br />
            {inquiry.shop.name}
            <span><FontAwesomeIcon icon={faClock}/>{`  ${new Date(inquiry.created_at).toDateString()}`}</span>
            </Col>
            <Col>
            <p>{`Replies (${totalReplies})`}</p>
            <div className={`replies`}>
                { totalReplies > 0 ? (
                    inquiry.replies.map((reply)=>{return <div>{reply.reply}</div>})
                ):<p></p>
                }
            </div>
            </Col>
            <Col>
            <Form>
                <Form.Group controlId="formBasicReply">
                <Form.Label>New Reply</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Write a reply.." value={reply} onChange={(event) => setReply(event.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={sendReply} disabled={submitting?true:false}>
                {submitting?'Submitting':'Send'}
                </Button>
            </Form>
            </Col>
        </Row>
    </Container>
}

export default InquiryView;
