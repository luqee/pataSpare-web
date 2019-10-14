import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PartItem from '../components/PartItem';

class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchResults: [],
            parts: [],
            categories: [],
            term: '',
        }
    }
    componentDidMount = () => {
        let results = this.props.location.state.results;
        console.log(results);
        
        if(results.type === `searchables`){
            if(results.results.parts !== undefined && results.results.parts.length > 0){
                let parts = []
                results.results.parts.map((item) => {
                    parts.push(item.searchable)
                })
                this.setState({parts: parts});
            }
            if(results.results.categories !== undefined && results.results.categories.length > 0){
                let categories = []
                results.results.categories.map((item) => {
                    categories.push(item.searchable)
                })
                this.setState({categories: categories});
            }
        }else{
            this.setState({parts: results.results})
        }
        
        this.setState({term: this.props.location.state.term})
    }
    render = () => {
        let parts = this.state.parts
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
                        (parts.length > 0) ? (
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