import React, {Component} from 'react';
import autoAPI from '../../api/api';
import urls from '../../config/config';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from './PartItem';

class Inventory extends Component {
    constructor(props){
        super(props);
        this.state = {
            parts: [],
        }
    }

    componentDidMount = () => {
        autoAPI.get(`${urls.dealerHome}/parts`, {
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
        const parts = this.state.parts;
        return (
            <Container className="inventory">
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
                            Nothing On Your Inventory
                        </div>
                        )
                    }
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    };
}

export default Inventory;
