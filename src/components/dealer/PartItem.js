import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container,Row, Col, Image, Button} from 'react-bootstrap';
import urls from '../../config/config';

class PartItem extends Component{
    render = () =>{
        return (
            <div className="part">
                <Container>
                    <Row>
                        <Col>
                            <Image width='100' height='100' src={`${urls.hostRoot}/${this.props.part.part_image}`} rounded />
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
