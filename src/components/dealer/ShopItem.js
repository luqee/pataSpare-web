import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container,Row, Col, Image, Button} from 'react-bootstrap';

class ShopItem extends Component{
    render = () =>{
        return (
            <div className="shop">
                <Container>
                    <Row>
                        <Col>
                            <Image width='50' height='50' src={this.props.shop.image_url} rounded />
                        </Col>
                        <Col>
                        {this.props.shop.name}
                        </Col>
                        <Col>
                         <Link to={ '/dealer/shops/'+this.props.shop.id+'/manage'}>
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
