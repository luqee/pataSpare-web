import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import CreateModelForm from '../../forms/CreateModelForm';
import ModelsRow from './ModelsRow';
function Brand(props){
    let brand = props.location.state.brand
    let model = props.location.state.model?props.location.state.model: null
    if(model){
        brand.models.push(model)
    }
    console.log('in brand: props are...');
    console.log(props);
    const updateBrand = (brand) =>{
        
    }
    return (
        <Container>
            <Row>
                <Col>
                <p>{brand.name}</p>
                <CreateModelForm brand={brand} history={props.history} userToken={props.userToken} brandId={brand.id} />
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
                    {
                        brand.models && brand.models.length > 0 ?
                        brand.models.map((model, indx) => {
                            return <ModelsRow brand={brand} userToken={props.userToken} model={model} key={indx} history={props.history} />
                            })
                        :
                        <p>No Models</p>
                    }
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Brand;
