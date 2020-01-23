import React, {Component} from 'react';
import {Container, Row, Col, Table, Image, Button} from 'react-bootstrap';
import Loader from '../Loader';
import autoAPI from '../../api/api'
import CreateCategoryForm from '../../forms/CreateCategoryForm';
import urls from '../../config/config';
import {Link} from 'react-router-dom';

class Categories extends Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            loading: true
        }
    }
    componentDidMount = () => {
        autoAPI.get(`admin/categories`, {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            if(response.data.status === 200){
                this.setState({loading: false})
                this.setState({categories: response.data.data.categories});
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    deleteCategory = (id) => {
        autoAPI.delete(`admin/categories/${id}`, {
            headers: {
                'Authorization': 'Bearer '+ this.props.userToken
            }
        })
        .then((response) => {
            if (response.status === 200){
                this.props.history.push(``);
                this.props.history.push('admin/categories');
            }
            
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    render = () => {
        let categories = this.state.categories
        return (
            <Container>
                <Row>
                    <Col>
                    <CreateCategoryForm history={this.props.history} userToken={this.props.userToken} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Table>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        <Loader loading={this.state.loading} />
                        {
                            categories.length > 0 ?
                            categories.map((category, indx) => {
                                return <tr key={indx}>
                                    <td><Image width='100' height='100' src={`${urls.hostRoot}/${category.category_image}`} rounded /></td>
                                    <td>{category.name}</td>
                                    <td><Link to={{
                                        pathname: `${this.props.match.url}/${category.id}`,
                                        state: {category: category}
                                    }}>
                                            <Button size={'sm'}>Manage</Button>
                                        </Link>
                                        &nbsp;
                                        <Button size={'sm'} onClick={()=>{
                                            this.deleteCategory(category.id)
                                        }}>Remove</Button>
                                    </td>
                                </tr>
                                })
                            :
                            !this.state.loading && <p>No Categories</p>
                        }
                        </tbody>
                    </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Categories;