import React, { Component } from 'react';
import {Container, Row, Col, Tab, Nav, Image} from 'react-bootstrap';
import ShopDetails from '../components/ShopDetails';
import autoAPI from '../api/api';
import urls from '../config/config';

class PartDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            part: {},
            shop: {}
        }
    }
    componentDidMount = () => {
        autoAPI.get(`/parts/${this.props.match.params.id}`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({part: response.data.data.part, shop: response.data.data.part.shop})
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render() {
        const part = this.state.part
        const shop = this.state.shop
        console.log('part item :');
        console.log(part);
        
        return (
            <Container>
                <Row>
                    <Col lg={4}>
                    <Image src={`${urls.hostRoot}/${part.part_image}`} width={200} height={200} />
                    </Col>
                    <Col lg={8}>
                        <p>{part.title}</p>
                        <p>{part.price}</p>
                        <p>{part.description}</p>
                        <p>{`In stock: ${part.stock}`}</p>
                    </Col>
                </Row>
                <Row>
                    <Tab.Container id="details-left-tabs" defaultActiveKey="shop">
                        <Col lg={4}>
                        <Nav variant="pills" className="flex-column" style={{
                            width: '100'
                        }}>
                            <Nav.Item>
                            <Nav.Link eventKey="shop">Shop</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="policies">Store Policies</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col lg={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="shop">
                            <ShopDetails shop={shop} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="reviews">
                            <p>User reviews</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="policies">
                            <p>Policies</p>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Tab.Container>
                </Row>
            </Container>
        )
    }
}

export default PartDetails;
  