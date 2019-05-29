import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
class CreateShopForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            shopImage: '',
            location: '',
            map: '',
            marker: ''
        }
    }
    componentDidMount = () => {
        // if (!window.google) {
        //     var s = document.createElement('script');
        //     s.type = 'text/javascript';
        //     s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA7ffxu8SN1t1hf_WRMYXZ6_pq8L5vsKeo&callback=initMap';
        //     var x = document.getElementsByTagName('script')[0];
        //     x.parentNode.insertBefore(s, x);
        //     // Below is important. 
        //     //We cannot access google.maps until it's finished loading
        //     s.addEventListener('load', e => {
        //         this.initMap();
        //     })
        // } else {
        //     this.initMap();
        // }
    }
    initMap = () => {
        // let mapInput = new window.google.maps.Map(document.getElementById('map'), {
        //     center: {lat: -3.397, lng: 40.644},
        //     zoom:10
        // });
        // let defaultMarker = new window.google.maps.Marker({
        //     position: {lat: -3.397, lng: 40.644},
        //     map: mapInput,
        //     draggable: true
        // })
        // this.setState({map: mapInput, marker: defaultMarker});
    }
    handleBusinessName = (event) => {
        this.setState({name: event.target.value});
    }
    handleDescription = (event) => {
        this.setState({description: event.target.value})
    }
    handleImageUpload = (event)=> {
        console.log(event.target.files[0]);
        this.setState({shopImage: event.target.files[0]})
    }
    handleLocation = (event) => {
        this.setState({location: event.target.value})
    }
    createShop = (event) => {
        event.preventDefault();
        console.log(this.state);
        let shopData = {
            name: this.state.name,
            description: this.state.description,
            location: this.state.location,
            latitude: -1.2345,
            longitude: 38.3465
        }
        let formData = new FormData();
        for (let name in shopData){
            formData.set(name, shopData[name])
            console.log(shopData[name]);
        }
        formData.set('shop_image', this.state.shopImage)
        console.log(shopData);
        console.log(formData);
        
        axios.post('/auto_dealer/shops', formData, {
            baseURL: 'http://127.0.0.1:8000/auto/api/v1',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }
        })
        .then((response) => {
            console.log(response);
            if (response.status === 201){
                this.props.history.push('/dealer');
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
                    <Form.Label>Business Name:</Form.Label>
                    <Form.Control placeholder="The name of your business" onChange={this.handleBusinessName}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Some description of your business" onChange={this.handleDescription}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicImage">
                    <Form.Label>Shop Image:</Form.Label>
                    <Form.Control type="file" accept=".png" placeholder="Upload image" onChange={this.handleImageUpload}/>
                    </Form.Group>
                    <Form.Group controlId="formBasiclocation">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control placeholder="Where is your business?" onChange={this.handleLocation}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicMap">
                    <Form.Label>Selet On Map:</Form.Label>
                    <div style={{ width: 250, height: 250 }} className="map" id="map"></div>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.createShop}>
                    CREATE SHOP
                    </Button>
                </Form>
            </div>
        );
    }
}

export default CreateShopForm;