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
            searchTerm: '',
            searchResults: [],
            results_set: false
        }
    }
    componentDidMount = () => {
        autoAPI.get('/brands')
        .then((response) => {
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
        let queryString = `term=${this.state.searchTerm}`
        if(this.state.brand){
            queryString = queryString.concat(`&brand=${this.state.brand.value}`)
        }
        if(this.state.model){
            queryString = queryString.concat(`&model=${this.state.model.value}`)
        }
        if(this.state.year){
            queryString = queryString.concat(`&year=${this.state.year.value}`)
        }
        
        autoAPI.get(`/search?${queryString}`)
        .then((response) => {
            if (response.data.status === 200){
                let path = {
                    pathname: `/results`,
                    state: {
                        results: response.data.data,
                        term: this.state.searchTerm
                    }
                }
                this.setState({brand: null, model: null, year: null, searchTerm: ''})
                this.props.history.push('')
                this.props.history.push(path)
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
        return <Container fluid>
            <Form inline style={{
                    justifyContent: 'center',
                    paddingTop: '5px ' 
                }}>
                <Form.Row style={{
                    width: '80%',
                }}>
                    <Col sm={3}>
                    <Select
                        placeholder={`Select Make`}
                        options={brandOptions}
                        onChange={this.handleBrand}
                        value={this.state.brand}
                    />
                    </Col>
                    <Col sm={3}>
                    <Select
                        value={this.state.model}
                        placeholder={`Select Model`}
                        onChange={this.handleModel}
                        options={modelOptions}
                    />
                    </Col>
                    <Col sm={3} >
                    <Select
                        value={this.state.year}
                        placeholder={`Select Year`}
                        options={yearOptions}
                        onChange={this.handleYear}
                    />
                    </Col>
                    <Col sm={3} >
                    <Form.Group controlId="query" style={{
                        display: 'flex',
                        flexWrap:"nowrap"
                    }}>
                        <Form.Control type="text" placeholder="Search" value={this.state.searchTerm} className=" mr-sm-2" onChange={this.handleSearchInput} />
                        <Button type="submit" onClick={this.search}>Search</Button>
                    </Form.Group>
                    
                    </Col>
                </Form.Row>
            </Form>
        </Container>
            
        
    }
}

export default SearchBar;
