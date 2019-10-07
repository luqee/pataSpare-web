import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import PartItem from './PartItem';
import autoAPI from '../../api/api';
import urls from '../../config/config';

class ShopInventory extends Component{
    constructor(props){
        super(props)
        this.state = {
            parts: []
        }
    }
    componentDidMount = () => {
        autoAPI.get(`${urls.dealerHome}/parts/shop/${this.props.match.params.id}`, {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            
            if (response.data.status === 200){
                
                this.setState({parts: response.data.data.parts});
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render = () => {
        let parts = this.state.parts
        return (
            <Container className="Inventory">
                <Row>
                    <Col>
                    <Link style={{
                        float:"right"
                    }} to={`/dealer/manage/${this.props.match.params.id}/part/create`}>
                        <Button>ADD PART</Button>
                    </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div className="parts">
                    {
                        (parts.length > 0) ? (
                            parts.map((part) => {
                            return (<PartItem key={part.id} part={part}/>)
                        })
                        )
                        :
                        (<div>
                            YOU CURRENTLY DON’T HAVE PARTS IN THIS STORE
                        </div>
                        )
                    }
                    </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ShopInventory;
