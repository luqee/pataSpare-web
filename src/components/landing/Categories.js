import {Container, Row, Col} from 'react-bootstrap';
import {urls} from '@/config/urls'
import Link from 'next/link';
import { autoAPI } from '@/config/axios';
import { Categories, Category, Mask, CatLink } from "@/styles/categories.module.css";

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
    return response.data.data.categories
}

export const CategoriesSection = async ()=>{
    const categories = await fetchCategories()
    return (
        <Container>
            <Row className={Categories}>
                {
                    (categories.length > 0) ? (
                        categories.map((cat, indx) => {
                            return (
                                <Col lg={4} key={indx} >
                                    <div className={Category} style={{
                                        backgroundImage: `url(${urls.apiHost}/${cat.category_image})`
                                    }}>
                                        <div className={Mask}>
                                            <Link href={`/part?category=${cat.id}`} className={CatLink}>
                                                {cat.name}
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
