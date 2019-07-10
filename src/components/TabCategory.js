import React, {Component} from 'react';
import PartItem from './PartItem';
import autoAPI from '../api/api';
import { Container, Row, Col } from 'react-bootstrap';

class TabCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: props.category,
            parts: []
        };
    }

    componentDidMount = () => {
        console.log('fetching by category'+ this.state.category);
        autoAPI.get('/search?category='+this.state.category)
        .then((response) => {
            console.log(response);
            if (response.data.status === 200){
                console.log('updating parts');
                this.setState({parts: response.data.data.parts});
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }

    render = () => {
        return (
            <Container>
                <Row>
                    {
                        (this.state.parts.length > 0) ? (
                            this.state.parts.map((part, index) => {
                                
                                return (<Col lg={3} key={index}>
                                        <PartItem part={part} key={part.id}/>
                                        </Col> 
                                    )
                            })
                        ): (
                            <Col>
                                NO PARTS UNDER THIS CATEGORY
                            </Col>
                        )
                    }
                </Row>
            </Container>
        )
    }
}
export default TabCategory;