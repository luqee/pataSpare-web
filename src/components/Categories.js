import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../images/cropped-temp_logo.png';
import  axios from '../api/api';

class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories: []
        }
    }
    componentDidMount = () => {
        axios.get(`/categories?preview=true`)
        .then((response) => {
            
            if (response.data.status === 200){
                this.setState({categories: response.data.data.categories})
            }
        })
        .catch((error) => {
            console.log(error);
            
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
                <Row style={{height: '320px'}}>
                    {
                        (this.state.categories.length > 0) ? (
                            this.state.categories.map((cat, indx) => {
                                return (
                                    <Col lg={4} key={indx} style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <div style={colStyle}>
                                        <Link to={`/part-category/${cat.id}`} >
                                        <div style={{
                                            color: '#ff6200',
                                            fontSize: '2em',
                                            fontWeight: 'bold'
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