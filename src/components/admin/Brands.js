import React, {Component} from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import Loader from '../Loader';
import autoAPI from '../../api/api'
import CreateBrandForm from '../../forms/CreateBrandForm';
import BrandsRow from './BrandsRow';
class Brands extends Component{
    constructor(props){
        super(props);
        this.state = {
            brands: [],
            loading: true
        }
    }
    componentDidMount = () => {
        autoAPI.get(`admin/brands`, {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            if(response.data.status === 200){
                this.setState({loading: false})
                this.setState({brands: response.data.data.brands});
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render = () => {
        let brands = this.state.brands
        return (
            <Container>
                <Row>
                    <Col>
                    <CreateBrandForm history={this.props.history} userToken={this.props.userToken} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        <Loader loading={this.state.loading} />
                        {
                            brands.length > 0 ?
                            brands.map((brand, indx) => {
                                return <BrandsRow userToken={this.props.userToken} brand={brand} key={indx} history={this.props.history} match={this.props.match}/>
                                })
                            :
                            !this.state.loading && <p>No Brands</p>
                        }
                        </tbody>
                    </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Brands;