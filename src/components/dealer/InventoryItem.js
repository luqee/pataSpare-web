import React, {Component} from 'react'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import Select from 'react-select';
import EditPartSchema from '../../forms/schemas/EditPartSchema';
import autoAPI from '../../api/api';
import urls from '../../config/config';

class InventoryItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            part: props.location.state? props.location.state.part: {},
            brandSelectOptions: [],
            yearSelectOptions: [],
            modelSelectOptions: [],
            tagsOptions: [],
            disabledModel: props.location.state.part.brand_id ? false: true,
            disabledYear: props.location.state.part.brand_id ? false: true,
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
        if(selected.value === 0){
            this.setState({disabledModel: true, disabledYear: true})
        }else{
            this.setState({disabledModel: false, disabledYear: false})
            this.state.brandSelectOptions.forEach((brand) => {
                if (brand.id === selected.value){
                    this.setState({modelSelectOptions: brand.models})
                }
            })
        }
    }
    // disableModelYear = () =>{
    //     this.setState({disabledModel: true, disabledYear: true})
    // }
    editPart = (values, actions) => {
        console.log('Editing part..Values');
        console.log(values);
        
        let formData = new FormData();
        const filterFields = ['brand', 'tags', 'models', 'years', 'name']
        for (let value in values) {
            if (values.hasOwnProperty(value) && filterFields.indexOf([value]) === -1) {
                if(values[value] != this.state.part[value]){
                    formData.set([value], values[value])
                }
            }
        }
        if(values.name != this.state.part.title){
            formData.set('title', values.name)
        }
        if(values.brand.value != this.state.part.brand_id){
            formData.set('brand_id', values.brand.value)
        }
        if(values.models != null){
            let models = []
            values.models.map((item) => models.push(item.value))
            formData.set('models', models)
            console.log('models are');
            console.log(models);
        }
        if(values.tags != null){
            let tags = Array.from(values.tags, (tag) => parseInt(tag.value))
            console.log('tags are');
            console.log(tags);
            formData.set('categories', tags)
        }
        if(values.years != null){
            let years = Array.from(values.years, (year) => parseInt(year.value))
            console.log('years are');
            console.log(years);
            formData.set('years', years)
        }
        console.log('final form data is ');
        console.log(formData);

        autoAPI.post(`${urls.dealerHome}/parts/${this.state.part.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ this.props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                actions.setSubmitting(false);
                let location ={
                    pathname: `/dealer/shops/manage/${this.state.part.shop_id}`,
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
    render = ()=>{
        let part = this.state.part
        let brandOptions = this.state.brandSelectOptions.map((brand) => {
            return {
                value: brand.id,
                label: brand.name
            }
        })
        let anyOption = {
            value: 0,
            label: 'any'
        }
        brandOptions.unshift(anyOption)
        let selectedBrand = null
        if(part.brand_id === null){
            console.log('part....');
            console.log(part);
            selectedBrand = anyOption
        }else{
            brandOptions.forEach((brand)=>{
                console.log('part....');
                console.log(part);
                if(brand.value === part.brand_id){
                    selectedBrand = brand
                }
            })
        }
        console.log('selected brand....');
        console.log(selectedBrand);
        let modelOptions = this.state.modelSelectOptions.map((model) => {
            return {
                value: model.id,
                label: model.name
            }
        })
        let selectedModels = null
        if(part.models.length > 0){
            selectedModels = []
            part.models.forEach((model)=>{
                let selectedModel = {
                    value: model.id,
                    label: model.name
                }
                selectedModels.push(selectedModel)
            })
        }
        let selectedYears = null
        if(part.years.length > 0){
            selectedYears = []
            part.years.forEach((year)=>{
                let selectYear = {
                    value: year.year,
                    label: year.year
                }
                selectedYears.push(selectYear)
            })
        }
        let today = new Date();
        let yearOptions = []
        for(let year = parseInt(today.getFullYear()); year >= 1990; year--){
            yearOptions.push({
                value: year,
                label: year
            })
        }
        let tagOptions = this.state.tagsOptions.map((tag) => {
            return {
                value: tag.id,
                label: tag.name
            }
        })
        let selectedCategories = null
        if(part.categories.length > 0){
            selectedCategories = []
            part.categories.forEach((category)=>{
                let selectedCategory = {
                    value: category.id,
                    label:category.name
                }
                selectedCategories.push(selectedCategory)
            })
        }
        let initialState = {
            brand: selectedBrand,
            models: selectedModels,
            years: selectedYears,
            tags: selectedCategories,
            name: part.title,
            description: part.description,
            partImage: null,
            price: part.price,
            stock: part.stock,
        }
        
        return(
            <Container>
                <p>{`Edit ${this.state.part.title}'s Details`}</p>
                <Row>
                    <Col lg={7}>
                    <Formik
                    validationSchema={EditPartSchema}
                    initialValues={initialState}
                    onSubmit={this.editPart}
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
                            <Form.Control placeholder="Title" value={values.name} onChange={handleChange}/>
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
                                options={brandOptions}
                                onChange={(selected) => {
                                    setFieldValue('brand', selected);
                                    setFieldValue('models', null);
                                    if(selected.value === 0){
                                        setFieldValue('years', null);
                                    }
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
                                isDisabled={this.state.disabledModel}
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
                                isDisabled={this.state.disabledYear}
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
                            <Form.Control placeholder="Price" value={values.price} onChange={handleChange}/>
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
                            <Form.Control type="number" min="1" placeholder="In stock" value={values.stock} onChange={handleChange}/>
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
                            <Form.Control as="textarea" rows="3" value={values.description} placeholder="Some description of the part item" onChange={handleChange}/>
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
                            <a target="_blank" href={`${urls.hostRoot}/${part.part_image}`} rel="noopener noreferrer">
                            <Image
                                id={`thumb`} width="200px" height="200px" src={`${urls.hostRoot}/${part.part_image}`}/>
                            </a>
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
                            {isSubmitting ? 'Submitting': 'EDIT'}
                            </Button>
                        </Form>
                    }}
                />
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default InventoryItem