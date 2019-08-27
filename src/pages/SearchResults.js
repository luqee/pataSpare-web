import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';

class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchResults: [],
            term: '',
        }
    }
    componentDidMount = () => {
        console.log('Rendering search results');
        this.setState({searchResults: this.props.location.state.results});
        this.setState({term: this.props.location.state.term})
    }
    render = () => {
        console.log('rendering search page');
        const parts = this.state.searchResults;

        return (
            <Container className={'Search-results'}>
                <Row style={{
                    justifyContent: 'center',
                    fontSize: '2em',
                    padding: '10px 0px'
                }}>
                    <p>{`Search results for: "${this.state.term}"`}</p>
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

export default SearchResults;