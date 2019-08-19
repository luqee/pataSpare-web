import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container,Row, Col, Image, Button} from 'react-bootstrap';
import urls from '../../config/config';

class ShopItem extends Component{
    render = () =>{
        return (
            <div className="shop">
                <Container>
                    <Row>
                        <Col>
                            <Image width='100' height='100' src={`${urls.hostRoot}/${this.props.shop.shop_image}`} rounded />
                        </Col>
                        <Col>
                        {this.props.shop.name}
                        </Col>
                        <Col>
                         <Link to={`${urls.dealerHome}/manage/${this.props.shop.id}`}>
                         <Button>MANAGE</Button>
                         </Link>
                        </Col>
                        <Col>
                        <Button>PROMOTE</Button>
                        share
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ShopItem;
