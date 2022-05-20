import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../images/cropped-temp_logo.png';
import { getCategoriesPreview } from '../api/api';
import Loader from './Loader'
import urls from '../config/config'

function Categories(){
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetchCategories()
    }, [])

    const fetchCategories = () => {
        getCategoriesPreview((response) => {
            if (response.status === 200){
                setLoading(false)
                setCategories(response.data.categories)
            }
        })
    }

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
                <Loader loading={loading} />
                {
                    (!loading && categories.length > 0) ? (
                        categories.map((cat, indx) => {
                            return (
                                <Col lg={4} key={indx} style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: '300px'
                                }}>
                                    <div style={{
                                        backgroundImage: `url(${urls.hostRoot}/${cat.category_image})`,
                                        width: '90%',
                                        height: '80%',
                                        borderRadius: '5%'
                                    }}>
                                        <div class="mask" style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display: 'flex',
                                            backgroundColor: '#000000',
                                            opacity: '0.6'
                                        }}>
                                            <Link to={`/part-category/${cat.id}`} style={{
                                                textDecoration: 'none'
                                            }}>
                                            <div style={{
                                                color: '#ffffff',
                                                fontSize: '1.5em',
                                                fontWeight: 'bold',
                                                padding: '0 5px'
                                            }}>
                                                {cat.name}
                                            </div>
                                            </Link>
                                        </div>
                                    
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

export default Categories;
