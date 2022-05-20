import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import PartItem from '../components/PartItem';

function SearchResults() {
    const location = useLocation()
    const [parts, setParts] = useState([])
    const [categories, setCategories] = useState([])
    const term = useState(location.state.term)
    useEffect(()=>{
        setResults()
    })
    const setResults = () => {
        let results = location.state.results;
        if(results.type === `searchables`){
            if(results.results.parts !== undefined && results.results.parts.length > 0){
                let parts = []
                results.results.parts.forEach((item) => {
                    parts.push(item.searchable)
                })
                setParts(parts)
            }
            if(results.results.categories !== undefined && results.results.categories.length > 0){
                let categories = []
                results.results.categories.forEach((item) => {
                    categories.push(item.searchable)
                })
                setCategories(categories)
            }
        }else{
            setParts(results.results)
        }
    }
    return (
        <Container className={'Search-results'}>
            <Row style={{
                justifyContent: 'center',
                fontSize: '2em',
                padding: '10px 0px'
            }}>
                <p>{`Search results for: "${term}"`}</p>
            </Row>
            <Row>
                {
                    (parts.length > 0) ? (
                        parts.map((part) => {
                            
                            return (<Col lg={3} key={part.id}>
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

export default SearchResults;