import React, {Component} from 'react';
import {Form, Button, Image} from 'react-bootstrap';
import autoAPI from '../api/api';
import urls from '../config/config';
import Select from 'react-select';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../App';

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
const PartSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    price: Yup.number()
      .positive('Must be postive')
      .required('Required field'),
    stock: Yup.number()
      .integer('Must be an integer')
      .positive('Must be postive')
      .required('Required field'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    brand: Yup.object()
        .nullable()
        .shape({
          value: Yup.number(),
          label: Yup.string()
        })
        .required('Required field'),
    models: Yup.array()
        .of(Yup.object().shape({
            value: Yup.number(),
            label: Yup.string()
        }))
      .nullable()
      .required('Required'),
    years: Yup.array()
        .nullable()
        .required('Required'),
    tags: Yup.array()
        .nullable()
        .required('Required'),
    partImage: Yup.mixed()
      .test('fileFormat', 'Unsupported file format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
    //   .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
      .required('Required field'),
  });

class CreatePartForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            brandSelectOptions: [],
            shop_id: this.props.shop.id,
            yearSelectOptions: [],
            modelSelectOptions: [],
            tagsOptions: []
        }
    }
    componentDidMount = () => {
        autoAPI.get('/brands')
        .then((response) => {
            if (response.status === 200){
                this.setState({brandSelectOptions: response.data.data.brands})
            }
            
        })
        .catch((error) => {
            console.log(error);
            
        })
        autoAPI.get('/categories')
        .then((response) => {
            if (response.status === 200){
                this.setState({tagsOptions: response.data.data.categories})
            }
            
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    handleBrand = (selected) => {
        this.state.brandSelectOptions.forEach((brand) => {
            if (brand.id === selected.value){
                this.setState({modelSelectOptions: brand.models})
            }
        })
    }
    createPart = (values, actions) => {
        let models = []
        values.models.map((item) => models.push(item.value))
        let tags = Array.from(values.tags, (tag) => parseInt(tag.value))
        let years = Array.from(values.years, (year) => parseInt(year.value))
        
        let partData = {
            title: values.name,
            brand_id: values.brand.value,
            models: models,
            years: years,
            price: values.price,
            stock: values.stock,
            description: values.description,
            categories: tags,
            shop_id: this.state.shop_id
        }
        let formData = new FormData();
        for (let name in partData){
            formData.set(name, partData[name])
        }
        formData.set('part_image', values.partImage)
        
        autoAPI.post(`${urls.dealerHome}/parts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ this.props.user.token
            }
        })
        .then((response) => {
            if (response.status === 201){
                actions.setSubmitting(false);
                let location ={
                    pathname: `/dealer/shops/manage/${this.state.shop_id}`,
                    state: {shop: this.props.shop}
                }
                this.props.history.push(location);
            }
            
        })
        .catch((error) => {
            actions.setSubmitting(false);
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
        for(let year = 1990; year <= parseInt(today.getFullYear()); year++){
            yearOptions.push({
                value: year,
                label: year
            })   
        }
        return (
            <Formik
                validationSchema={PartSchema}
                initialValues={{
                    brand: null,
                    models: null,
                    years: null,
                    tags: null,
                    name: '',
                    description: '',
                    partImage: null,
                    price: '',
                    stock: '',
                }}
                onSubmit={this.createPart}
                render={({
                    values,
                    setFieldValue,
                    errors, 
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                }) => {
                    return <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control placeholder="Title" onChange={handleChange}/>
                        <ErrorMessage name="name" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="brand">
                        <Form.Label>Brand:</Form.Label>
                        <Select
                            placeholder={`Select Make`}
                            options={brandOptions}
                            onChange={(selected) => {
                                setFieldValue('brand', selected);
                                setFieldValue('models', null);
                                this.handleBrand(selected);
                                
                            }}
                            value={values.brand}
                        />
                        <ErrorMessage name="brand" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="models">
                        <Form.Label>Models:</Form.Label>
                        <Select
                            value={values.models}
                            placeholder={`Select Model`}
                            onChange={(selected) => {
                                setFieldValue('models', selected)
                            }}
                            options={modelOptions}
                            isMulti={true}
                        />
                        <ErrorMessage name="models" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="years">
                        <Form.Label>Years:</Form.Label>
                        <Select
                            value={values.years}
                            placeholder={`Years`}
                            onChange={(selected) => {
                                setFieldValue('years', selected)
                            }}
                            options={yearOptions}
                            isMulti={true}
                        />
                        <ErrorMessage name="years" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="price">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control placeholder="Price" onChange={handleChange}/>
                        <ErrorMessage name="price" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="stock">
                        <Form.Label>Stock:</Form.Label>
                        <Form.Control type="number" min="1" placeholder="In stock" onChange={handleChange}/>
                        <ErrorMessage name="stock" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Some description of the part item" onChange={handleChange}/>
                        <ErrorMessage name="description" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="partImage">
                        <Form.Label>Part Image:</Form.Label>
                        <Form.Control type="file" placeholder="Upload image" onChange={(event) => {
                            let thumbImg = document.getElementById(`thumb`);
                            let reader = new FileReader();
                            reader.onloadend = () => {
                                thumbImg.src = reader.result;
                                thumbImg.height = 200
                                thumbImg.width = 200
                            };
                            reader.readAsDataURL(event.currentTarget.files[0]);
                            setFieldValue("partImage", event.currentTarget.files[0]);
                            
                        }}/>
                        <Image
                            id={`thumb`}/>
                        <ErrorMessage name="partImage" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Form.Group controlId="tags">
                        <Form.Label>Tags:</Form.Label>
                        <Select
                            value={values.tags}
                            placeholder={`Tags`}
                            onChange={(selected) => {
                                setFieldValue('tags', selected)
                            }}
                            options={tagOptions}
                            isMulti={true}
                        />
                        <ErrorMessage name="tags" render={(msg) => {
                            return <Form.Control.Feedback type="invalid" style={{
                                display: `block`
                              }}>
                            {msg}
                            </Form.Control.Feedback>
                        }}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                        {isSubmitting ? 'Submitting': 'CREATE PART'}
                        </Button>
                    </Form>
                }}
            />
        );
    }
}

export default CreatePartForm;