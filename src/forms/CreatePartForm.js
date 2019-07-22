import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';

class CreatePartForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            model: '',
            brand: '',
            name: '',
            description: '',
            partImage: '',
            price: '',
            stock: '',
            tags: [],
            brandSelectOptions: [],
        
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
    handlePartName = (event) => {
        this.setState({name: event.target.value});
    }
    handleDescription = (event) => {
        this.setState({description: event.target.value})
    }
    handleImageUpload = (event)=> {
        this.setState({partImage: event.target.files[0]})
    }
    handleModel = (event) => {
        this.setState({model: parseInt(event.target.value)})
    }
    handleBrand = (event) => {
        console.log(event.target.value);
        this.state.brandSelectOptions.forEach((brand) => {
            if (brand.id === parseInt(event.target.value)){
                this.setState({modelSelectOptions: brand.models})
            }
        })
        this.setState({brand: parseInt(event.target.value)})
        this.setState({model: ''})
    }
    handlePrice = (event) => {
        this.setState({price: parseInt(event.target.value)})
    }
    handleStock = (event) => {
        this.setState({stock: parseInt(event.target.value)})
    }
    handleTags = (event) => {
        this.setState({tags: Array.from(event.target.selectedOptions, (item) => parseInt(item.value))})
        console.log(this.state.tags);
    }
    createPart = (event) => {
        event.preventDefault();
        console.log(this.state);
        let partData = {
            title: this.state.name,
            brand_id: this.state.brand,
            b_model_id: this.state.model,
            price: this.state.price,
            stock: this.state.stock,
            description: this.state.description,
            categories: this.state.tags
        }
        let formData = new FormData();
        for (let name in partData){
            console.log(name, partData[name]);
            formData.set(name, partData[name])
        }
        formData.set('part_image', this.state.partImage)
        
        autoAPI.post(`${urls.dealerHome}/shops/${this.props.shopId}/parts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }
        })
        .then((response) => {
            console.log(response);
            if (response.status === 201){
                this.props.history.push(`${urls.dealerHome}/shops/${this.props.shopId}/manage`);
            }
            
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    render = () => {
        return (
            <div className="form-holder">
                <Form>
                    <Form.Group controlId="formBasicName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control placeholder="Title" onChange={this.handlePartName}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicBrand">
                    <Form.Label>Brand:</Form.Label>
                    <Form.Control as="select" placeholder="Brand" onChange={this.handleBrand}>
                        <option>Select a brand</option>
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
                    <Form.Label>Model:</Form.Label>
                    <Form.Control as="select" placeholder="Model" onChange={this.handleModel}>
                    <option>select model</option>
                    {
                        this.state.modelSelectOptions.map((model) => {
                            return (<option key={model.id} value={model.id}>{model.name}</option>)
                        })
                    }
                    </Form.Control>
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
                    <Form.Control as="select" value={this.state.tags} multiple placeholder="Select tags" onChange={this.handleTags}>
                    {
                        this.state.tagsOptions.map((tag) => {
                            return (<option key={tag.id} value={tag.id}>{tag.name}</option>)
                        })
                    }
                    </Form.Control>
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