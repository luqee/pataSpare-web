import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container,Row, Col, Image, Button} from 'react-bootstrap';

class PartItem extends Component{
    render = () =>{
        return (
            <div className="part">
                <Container>
                    <Row>
                        <Col>
                            <Image width='50' height='50' src={this.props.part.image_url} rounded />
                        </Col>
                        <Col>
                        {this.props.part.name}
                        </Col>
                        <Col>
                        {this.props.part.price}
                        </Col>
                        <Col>
                        {this.props.part.stock}
                        </Col>
                        <Col>
                         <Link to={ '/dealer/parts/'+this.props.part.id+'/manage'}>
                         <Button>EDIT</Button>
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

export default PartItem;
