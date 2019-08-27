import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import autoAPI from '../api/api';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            brand: '',
            model: '',
            year: '',
            searchTerm: '',
            yearSelectOptions: [],
            brandSelectOptions: [],
            modelSelectOptions: [],
            searchResults: [],
            results_set: false
        }
    }
    componentDidMount = () => {
        autoAPI.get('/brands')
        .then((response) => {
            console.log(response);
            if (response.status === 200){
                console.log('Updating brands');
                this.setState({brandSelectOptions: response.data.data.brands})
                console.log(this.state.brandSelectOptions);
            }
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    handleBrand = (event) => {
        console.log(event.target.value);
        this.state.brandSelectOptions.forEach((brand) => {
            if (brand.id === parseInt(event.target.value)){
                this.setState({modelSelectOptions: brand.models});
                this.setState({brand: parseInt(event.target.value)});
            }
        })
        
        this.setState({model: ''})
    }
    handleModel = (event) => {
        this.setState({model: parseInt(event.target.value)})
    }
    handleYear = (event) => {
        this.setState({year: parseInt(event.target.value)})
    }
    handleSearchInput = (e) => {
        this.setState({searchTerm: e.target.value})
    }
    search = (event) => {
        event.preventDefault();
        console.log('Serching .....');
        let query = `term=${this.props.match.params.term}&brand=${this.state.brand}&model=${this.state.model}$year=${this.state.year}`;
        autoAPI.get(`/search?${query}`)
        .then((response) => {
            if (response.data.status === 200){
                this.setState({searchResults: response.data.data.results})
                console.log('Search results are ::');
                console.log(response.data.data.results);
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render = () => {

        return (this.state.results_set) ? <Redirect to={{
            pathname: '/results',
            state: {results: this.state.searchResults, term: this.state.searchTerm}
        }} />
        :
        <Container className='searchbar' id='searchbar' fluid>
            <Row className='justify-content-center'>
            <Col lg={8}>
                <Form inline>
                    <Form.Group controlId="formBasicBrand">
                    <Form.Control as="select" placeholder="Brand" onChange={this.handleBrand}>
                        {/* <option>Select a brand</option> */}
                        {
                            (this.state.brandSelectOptions.length > 0) ? (
                                this.state.brandSelectOptions.map((brand,index) => {
                                    return (<option key={brand.id} value={brand.id}>{brand.name}</option>)
                                })
                            ):(
                                <option>No Options</option>
                            )
                        }
                    </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicModel">
                    <Form.Control as="select" placeholder="Model" onChange={this.handleModel}>
                    {/* <option>select model</option> */}
                    {
                        this.state.modelSelectOptions.map((model) => {
                            return (<option key={model.id} value={model.id}>{model.name}</option>)
                        })
                    }
                    </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicYear">
                    <Form.Control as="select" placeholder="Year" onChange={this.handleYear}>
                    {/* <option>select year</option> */}
                    {
                        this.state.yearSelectOptions.map((year, indx) => {
                            return (<option key={indx} value={year}>{year}</option>)
                        })
                    }
                    </Form.Control>
                    </Form.Group>
                    <Form.Group>
                    <Form.Control type="text" placeholder="Search" className=" mr-sm-2" onChange={this.handleSearchInput} />
                    <Button type="submit" onClick={this.search}>Submit</Button>
                    </Form.Group>
                </Form>
                </Col>
            </Row>
        </Container>
    }
}

export default SearchBar;
