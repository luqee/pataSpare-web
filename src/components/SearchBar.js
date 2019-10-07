import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import Select from 'react-select';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            brandOptions: [],
            modelOptions: [],
            yearOptions: [],
            brand: null,
            model: null,
            year: null,
            searchTerm: null,
            searchResults: [],
            results_set: false
        }
    }
    componentDidMount = () => {
        autoAPI.get('/brands')
        .then((response) => {
            console.log(response);
            if (response.status === 200){
                this.setState({brandOptions: response.data.data.brands})
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    handleBrand = (selected) => {
        this.setState({brand: selected});
        this.state.brandOptions.forEach((brand) => {
            if (brand.id === parseInt(selected.value)){
                this.setState({modelOptions: brand.models});
                this.setState({yearOptions: []});
            }
        })
        this.setState({model: null})
        this.setState({year: null})
    }
    handleModel = (selected) => {
        this.setState({model: selected})
        this.state.modelOptions.forEach((model) => {
            if (model.id === parseInt(selected.value)){
                this.setState({yearOptions: model.years})
            }
        })
        this.setState({year: null})
    }
    handleYear = (selected) => {
        this.setState({year: selected})
    }
    handleSearchInput = (e) => {
        this.setState({searchTerm: e.target.value})
    }
    search = (event) => {
        event.preventDefault();
        console.log('Serching .....');
        let queryString = `term=${this.state.searchTerm}`
        if(this.state.brand){
            queryString.concat(`&brand=${this.state.brand.value}`)
            console.log(`querystring is...`);
            console.log(queryString);
        }
        if(this.state.model){
            queryString.concat(`&model=${this.state.model.value}`)
            console.log(`querystring is...`);
            console.log(queryString);
        }
        if(this.state.year){
            queryString.concat(`&year=${this.state.year.value}`)
            console.log(`querystring is...`);
            console.log(queryString);
        }
        console.log(`querystring is...`);
        console.log(queryString);
        
        autoAPI.get(`/search?${queryString}`)
        .then((response) => {
            if (response.data.status === 200){
                console.log('Search results are ::');
                console.log(response.data.data.results);
                let path = {
                    pathname: `/results`,
                    state: {
                        results: response.data.data,
                        term: this.state.searchTerm
                    }
                }
                this.props.history.push(path)
                // this.setState({searchResults: response.data.data.results});
                // this.setState({results_set: true});
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render = () => {
        let brandOptions = this.state.brandOptions.map((brand) => {
            return {
                value: brand.id,
                label: brand.name
            }
        })

        let modelOptions = this.state.modelOptions.map((model) => {
            return {
                value: model.id,
                label: model.name
            }
        })
        let yearOptions = this.state.yearOptions.map((year) => {
            return {
                value: year.year,
                label: year.year
            }
        })
        return <Container fluid className='searchbar' id='searchbar'>
            <Row>
            <Col>
            <Form inline>
                <Container>
                    <Row>
                    <Col>
                    <Select
                        placeholder={`Select Make`}
                        options={brandOptions}
                        onChange={this.handleBrand}
                        value={this.state.brand}
                    />
                    </Col>
                    <Col>
                    <Select
                        value={this.state.model}
                        placeholder={`Select Model`}
                        onChange={this.handleModel}
                        options={modelOptions}
                    />
                    </Col>
                    <Col>
                    <Select
                        value={this.state.year}
                        placeholder={`Select Year`}
                        options={yearOptions}
                        onChange={this.handleYear}
                    />
                    </Col>
                    <Col style={{
                        display: 'flex',

                    }}>
                    <Form.Control type="text" placeholder="Search" className=" mr-sm-2" onChange={this.handleSearchInput} />
                    <Button type="submit" onClick={this.search}>Search</Button>
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
