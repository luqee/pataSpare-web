import {useState, useContext, useEffect}from 'react'
import {Container,Row, Col, Image, Button, Form, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import urls from '../../config/config';
import { useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { getInquiry, postReplyInquiry } from '../../api/api';

function ViewInquiry(){
    const location = useLocation()
    const [inquiry, setInquiry] = useState(null)
    const params = useParams()
    const userContext = useContext(UserContext)

    useEffect(()=>{
        if(location.state !== undefined){
            setInquiry(location.state.inquiry)
        }else{
            fetchInquiry()
        }
    })
    const fetchInquiry = () => {
        getInquiry(params.inquiryId, userContext.user, (response) => {
            if(response.status === 200){
                setInquiry(response.data.inquiry)
            }
        })
    }
    
    const [reply, setReply] = useState('')
    let [submitting, setSubmitting] = useState(false)
    let totalReplies = 0
    if(inquiry.replies && inquiry.replies.length > 0){
        totalReplies = inquiry.replies.length
    }

    const sendReply = (event) => {
        event.preventDefault()
        setSubmitting(true)
        postData = {reply}
        postReplyInquiry(inquiry.id, postData, userContext.user, (response)=>{
            if(response.status === 201){
                setSubmitting(false)
                setReply('')
                setInquiry(response.data.inquiry)
            }
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
                    inquiry.replies.map((reply, indx)=>{return <Card key={indx}>
                        <Card.Header>{`By: ${reply.user.name}`}</Card.Header>
                        <Card.Body>{reply.reply}</Card.Body>
                    </Card>})
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

export default ViewInquiry;
