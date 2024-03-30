import {Container, Row, Col} from 'react-bootstrap';
import {urls} from '@/config/urls'
import Link from 'next/link';
import { autoAPI } from '@/config/axios';


const fetchCategories = async ()=>{
    const searchParams = new URLSearchParams()
    searchParams.set('preview', 'true')
    let reqPath = '/categories'
    reqPath+=`?${searchParams.toString()}`
    const response = await autoAPI.get(reqPath, {
        validateStatus: function (status) {
            return status < 500;
        }
    })
    if (!response){
        console.log('No response received');
        throw new Error('Failed to get Categories')
    }
    if (!response.status === 200){
        console.log('Error response received');
        throw new Error('Error while to get Categories')
    }
    console.log('Response is 200');
    return response.data.data.categories
}

export const CategoriesSection = async ()=>{
    const categories = await fetchCategories()

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
                {
                    (categories.length > 0) ? (
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
                                        <div className="mask" style={{
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
