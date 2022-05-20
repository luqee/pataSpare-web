import { useContext, useEffect, useState} from 'react';
import { getInquiries } from '../../api/api';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';
import Loader from '../../components/Loader';
import {Link} from 'react-router-dom';
import { UserContext } from '../../App';

function Inquiries() {
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)
    const userContext = useContext(UserContext)

    useEffect(()=>{
        fetchInquiries()
    }, [])

    const fetchInquiries = () => {
        getInquiries(userContext.user, (response) => {
            if(response.status === 200){
                setLoading(false)
                setInquiries(response.data.inquiries)
            }
        })
    }

    return (
        <Container>
            <Row>
                <Col>
                <p>My Inquiries</p>
                </Col>
            </Row>
            <Row style={{
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
                <Col lg={12}>
                    <Table>
                        <thead>
                        <tr>
                        <th>Query</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Replies</th>
                        <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <Loader loading={loading} />
                        {
                            inquiries.length > 0 ?
                            inquiries.map((inquiry, indx) => {
                                let num_of_replies = 0
                                if(inquiry.replies && inquiry.replies.length > 0){
                                    num_of_replies = inquiry.replies.length
                                }
                                return <tr key={indx}>
                                    <td>{inquiry.query}</td>
                                    <td>{(inquiry.part === null) ? '-': inquiry.part.name}</td>
                                    <td>{(inquiry.shop === null) ? '-': inquiry.shop.name}</td>
                                    <td>{num_of_replies}</td>
                                    <td>
                                    <Link to={{
                                        pathname: `${inquiry.id}`,
                                        state: {inquiry: inquiry }
                                    }}>
                                    <Button>View</Button>
                                    </Link>
                                        
                                    </td>
                                </tr>
                                })
                            :
                            !loading && <p>NO INQUIRIES</p>
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Inquiries;
