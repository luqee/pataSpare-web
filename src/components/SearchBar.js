import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import autoAPI from '../api/api';
import Select from 'react-select';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            brands: [],
            models: [],
            years: [],
            brand: '',
            model: '',
            year: '',
            searchTerm: '',
            searchResults: [],
            results_set: false
        }
    }
    componentDidMount = () => {
        autoAPI.get('/brands')
        .then((response) => {
            console.log(response);
            if (response.status === 200){
                this.setState({brands: response.data.data.brands})
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    handleBrand = (event) => {
        this.setState({brand: parseInt(event.target.value)});
        this.state.brands.forEach((brand) => {
            if (brand.id === parseInt(event.target.value)){
                this.setState({models: brand.models});
            }
        })
        this.setState({model: ''})
    }
    handleModel = (event) => {
        this.setState({model: parseInt(event.target.value)})
        this.state.models.forEach((model) => {
            if (model.id === parseInt(event.target.value)){
                this.setState({years: model.years})
            }
        })
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
        let query = `term=${this.state.searchTerm}&brand=${this.state.brand}&model=${this.state.model}&year=${this.state.year}`;
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
        let brandOptions = this.state.brands.map((brand) => {
            return {
                value: brand.id,
                label: brand.name
            }
        })

        let modelOptions = this.state.models.map((model) => {
            return {
                value: model.id,
                label: model.name
            }
        })
        let yearOptions = this.state.years.map((year) => {
            return {
                value: year.year,
                label: year.year
            }
        })
        return (this.state.results_set) ? <Redirect to={{
            pathname: '/results',
            state: {results: this.state.searchResults, term: this.state.searchTerm}
        }} />
        :
        <Container className='searchbar' id='searchbar'>
            <Row>
            <Col>
            <Form inline>
                <Container>
                    <Row>
                    <Col>
                    <Select options={brandOptions} />
                    </Col>
                    <Col>
                    <Select options={modelOptions} />
                    </Col>
                    <Col>
                    <Select options={yearOptions} />
                    </Col>
                    <Col style={{
                        display: 'flex',

                    }}>
                    <Form.Control type="text" placeholder="Search" className=" mr-sm-2" onChange={this.handleSearchInput} />
                    <Button type="submit" onClick={this.search}>Submit</Button>
                    </Col>
                    </Row>
                </Container>
            </Form>
            </Col>
            </Row>
        </Container>
    }
}

export default SearchBar;
