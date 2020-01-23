import React, {Component} from 'react';
import autoAPI from '../../api/api';
import urls from '../../config/config';
import {Container, Row, Col, Button, Table, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ShopsTable from './ShopsTable';
import Loader from '../Loader';
class Shops extends Component {
    constructor(props){
        super(props);
        this.state = {
            shops: [],
            loading: true
        }
    }

    componentDidMount = () => {
        autoAPI.get(`${urls.dealerHome}/shops`, {
            headers: {'Authorization': 'Bearer '+ this.props.userToken}
        })
        .then((response) => {
            
            if (response.data.status === 200){
                this.setState({loading: false})
                this.setState({shops: response.data.data.shops});
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    render = () => {
        const shops = this.state.shops;
        return (
            <Container className="shops-content">
                <Row>
                <Link style={{
                    float: "right"
                }} to={`${this.props.match.url}/create`}>
                <Button>ADD SHOP</Button>
                </Link>
                </Row>
                <Row>
                    <Table>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Name</th>
                            <th>location</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        <Loader loading={this.state.loading} />
                        {
                            shops.length > 0 ?
                            shops.map((shop, indx) => {
                                return <tr key={indx}>
                                    <td><Image width='100' height='100' src={`${urls.hostRoot}/${shop.shop_image}`} rounded /></td>
                                    <td>{shop.name}</td>
                                    <td>{shop.location}</td>
                                    <td><Link to={{
                                        pathname: `${this.props.match.url}/manage/${shop.id}`,
                                        state: {shop: shop}
                                    }}>
                                            <Button>Manage</Button>
                                        </Link>
                                        <Link to={{
                                            pathname: `${this.props.match.url}/${shop.id}`,
                                            state: {shop: shop}
                                        }}>
                                            <Button>View</Button>
                                        </Link>
                                    </td>
                                </tr>
                                })
                            :
                            !this.state.loading && <p>YOU CURRENTLY DON’T OWN A SHOP</p>
                        }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        );
    };
}

export default Shops;
