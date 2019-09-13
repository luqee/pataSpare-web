import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';
import Select from 'react-select';

class CreatePartForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            brand: null,
            models: null,
            years: null,
            tags: null,
            name: '',
            description: '',
            partImage: '',
            price: '',
            stock: '',
            brandSelectOptions: [],
            shop_id: this.props.shopId,
            yearSelectOptions: [],
            modelSelectOptions: [],
            tagsOptions: []
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
        autoAPI.get('/categories')
        .then((response) => {
            console.log(response);
            if (response.status === 200){
                console.log('Updating categories');
                this.setState({tagsOptions: response.data.data.categories})
                console.log(this.state.tagsOptions);
                
            }
            
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    handleYear = (selected) => {
        this.setState({years: selected});
    }
    handlePartName = (event) => {
        this.setState({name: event.target.value});
    }
    handleDescription = (event) => {
        this.setState({description: event.target.value})
    }
    handleImageUpload = (event)=> {
        this.setState({partImage: event.target.files[0]})
    }
    handleModel = (selected) => {
        console.log(`selected models..`);
        console.log(selected);
        
        this.setState({models: selected})
    }
    handleBrand = (selected) => {
        this.setState({brand: selected})
        this.state.brandSelectOptions.forEach((brand) => {
            if (brand.id === selected.value){
                this.setState({modelSelectOptions: brand.models})
            }
        })
        this.setState({models: []})
    }
    handlePrice = (event) => {
        this.setState({price: parseInt(event.target.value)})
    }
    handleStock = (event) => {
        this.setState({stock: parseInt(event.target.value)})
    }
    handleTags = (selected) => {
        // this.setState({tags: Array.from(event.target.selectedOptions, (item) => parseInt(item.value))})
        console.log(selected);
        this.setState({tags: selected})
    }
    createPart = (event) => {
        event.preventDefault();
        console.log(this.state);
        let models = []
        this.state.models.map((item) => models.push(item.value))
        let tags = Array.from(this.state.tags, (tag) => parseInt(tag.value))
        let years = Array.from(this.state.years, (year) => parseInt(year.value))
        console.log(models);
        
        let partData = {
            title: this.state.name,
            brand_id: this.state.brand.value,
            models: models,
            years: years,
            price: this.state.price,
            stock: this.state.stock,
            description: this.state.description,
            categories: tags,
            shop_id: this.state.shop_id
        }
        let formData = new FormData();
        for (let name in partData){
            console.log(name, partData[name]);
            formData.set(name, partData[name])
        }
        formData.set('part_image', this.state.partImage)
        
        autoAPI.post(`${urls.dealerHome}/parts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }
        })
        .then((response) => {
            console.log(response);
            if (response.status === 201){
                this.props.history.push(`${urls.dealerHome}/manage/${this.props.shopId}`);
            }
            
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    render = () => {
        let brandOptions = this.state.brandSelectOptions.map((brand) => {
            return {
                value: brand.id,
                label: brand.name
            }
        })
        let modelOptions = this.state.modelSelectOptions.map((model) => {
            return {
                value: model.id,
                label: model.name
            }
        })
        let tagOptions = this.state.tagsOptions.map((tag) => {
            return {
                value: tag.id,
                label: tag.name
            }
        })
        let today = new Date();
        let yearOptions = []
        for(let year = 2000; year <= parseInt(today.getFullYear()); year++){
            yearOptions.push({
                value: year,
                label: year
            })   
        }
        return (
            <div className="form-holder">
                <Form>
                    <Form.Group controlId="formBasicName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control placeholder="Title" onChange={this.handlePartName}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicBrand">
                    <Form.Label>Brand:</Form.Label>
                    <Select
                        placeholder={`Select Make`}
                        options={brandOptions}
                        onChange={this.handleBrand}
                        value={this.state.brand}
                    />
                    </Form.Group>
                    <Form.Group controlId="formBasicModel">
                    <Form.Label>Models:</Form.Label>
                    <Select
                        value={this.state.models}
                        placeholder={`Select Model`}
                        onChange={this.handleModel}
                        options={modelOptions}
                        isMulti={true}
                    />
                    </Form.Group>
                    <Form.Group controlId="formBasicYear">
                    <Form.Label>Years:</Form.Label>
                    <Select
                        value={this.state.years}
                        placeholder={`Years`}
                        onChange={this.handleYear}
                        options={yearOptions}
                        isMulti={true}
                    />
                    </Form.Group>
                    <Form.Group controlId="formBasicPrice">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control placeholder="Price" onChange={this.handlePrice}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicStock">
                    <Form.Label>Stock:</Form.Label>
                    <Form.Control type="number" min="1" placeholder="In stock" onChange={this.handleStock}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Some description of the part item" onChange={this.handleDescription}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicImage">
                    <Form.Label>Part Image:</Form.Label>
                    <Form.Control type="file" accept=".png" placeholder="Upload image" onChange={this.handleImageUpload}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicTags">
                    <Form.Label>Tags:</Form.Label>
                    <Select
                        value={this.state.tags}
                        placeholder={`Tags`}
                        onChange={this.handleTags}
                        options={tagOptions}
                        isMulti={true}
                    />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.createPart}>
                    CREATE PART
                    </Button>
                </Form>
            </div>
        );
    }
}

export default CreatePartForm;