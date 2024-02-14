import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Loader from '@/components/Loader'
import {urls} from '@/config/urls'
import {getCategories} from '@/utils/api'
import Link from 'next/link';

export const CategoriesSection = ()=>{
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchCategories = ()=>{
        const searchParams = new URLSearchParams()
        searchParams.set('preview', 'true')
        getCategories(searchParams.toString())
        .then((response) => {
            setLoading(false)
            if (response.status === 200){
                setCategories(response.data.data.categories)
            }
        })
        .catch((error) => {
            console.log(error);
            setLoading(false)
        })
    }

    useEffect(()=>{
        fetchCategories()
    }, [])

    // const colStyle = {
    //     backgroundImage: `url(${logo})`,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '90%',
    //     height: '80%'
    // }
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
                                        backgroundImage: `url(${urls.apiHost}/${cat.category_image})`,
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
                                            <Link href={`/part?category=${cat.id}`} style={{
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
