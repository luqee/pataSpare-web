import React, { Component } from 'react';
import CreatePartForm from '../../forms/CreatePartForm';
import {Container,Row, Col} from 'react-bootstrap';

class CreatePart extends Component {
    render = () => {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                    <div className="create-part">
                    <CreatePartForm history={this.props.history} shopId={this.props.match.params.id}/>
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CreatePart;
