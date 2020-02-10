import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../images/cropped-temp_logo.png';
import  axios from '../api/api';
import Loader from './Loader'
import urls from '../config/config'

class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            loading: true
        }
    }
    componentDidMount = () => {
        axios.get(`/categories?preview=true`)
        .then((response) => {

            if (response.data.status === 200){
                this.setState({categories: response.data.data.categories})
                this.setState({loading: false})
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false})
        })
    }
    render = () => {
        const colStyle = {
            backgroundImage: `url(${logo})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            height: '80%'
        }
        return (
            <Container className='categories' id='categories'>
                <Row style={{minHeight: '20px', justifyContent: `center`}}>
                    <Loader loading={this.state.loading} />
                    {
                        (!this.state.loading && this.state.categories.length > 0) ? (
                            this.state.categories.map((cat, indx) => {
                                return (
                                    <Col lg={4} key={indx} style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minHeight: '300px'
                                    }}>
                                        <div style={{
                                            backgroundImage: `url(${urls.hostRoot}/${cat.category_image})`,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '90%',
                                            height: '80%',
                                            borderRadius: '5%'
                                        }}>
                                        <Link to={`/part-category/${cat.id}`} style={{
                                            textDecoration: 'none'
                                        }}>
                                        <div style={{
                                            color: '#ffffff',
                                            fontSize: '1.5em',
                                            fontWeight: 'bold',
                                            backgroundColor: '#007bff',
                                            padding: '0 5px'
                                        }}>
                                            {cat.name}
                                        </div>
                                        </Link>
                                        </div>

                                    </Col>
                                );
                            })
                        ):(
                            <div></div>
                        )
                    }
                </Row>
            </Container>
        )
    }
}

export default Categories;
