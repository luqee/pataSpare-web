import React, { Component } from 'react';
import CreatePartForm from '../../forms/CreatePartForm';
import {Container,Row, Col} from 'react-bootstrap';

class CreatePart extends Component {
    render = () => {
        console.log('createPart page');
        console.log(this.props);
        
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                    <div className="create-part">
                    <CreatePartForm history={this.props.history} shop={this.props.shop}/>
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CreatePart;
