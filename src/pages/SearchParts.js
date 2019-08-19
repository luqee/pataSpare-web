import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';
import  autoAPI from '../api/api';

class SearchParts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchResults: {},
            parts: []
        }
    }
    componentDidMount = () => {
        console.log('Getting search');
        
        autoAPI.get(`/search?term=${this.props.match.params.term}`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({parts: response.data.data.results.parts})
                console.log('Search results are ::');
                console.log(response.data.data.results);
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render = () => {
        console.log('rendering search page');
        const parts = this.state.parts;
        
        return (
            <Container className={'Search-results'}>
                <Row style={{
                    justifyContent: 'center',
                    fontSize: '2em',
                    padding: '10px 0px'
                }}>
                    <p>{`Search results for: "${this.props.match.params.term}"`}</p>
                </Row>
                <Row>
                    {
                        (parts > 0) ? (
                            parts.map((part, index) => {
                                
                                return (<Col lg={3} key={index}>
                                        <PartItem part={part} key={part.id}/>
                                        </Col> 
                                    )
                            })
                        ): (
                            <Col>
                                No parts found matching your query
                            </Col>
                        )
                    }
                </Row>
            </Container>
        )
    }
}

export default SearchParts;