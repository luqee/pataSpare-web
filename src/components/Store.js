import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

function Store(props){
    return (
        <Container>
            <Row>
                <Col style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundImage: `url(props.shop.shop_image)`
                    }}>
                <p>{props.shop.name}</p>
                {/* <Image height={200} width={200}  src={props.shop.shop_image} /> */}
                </Col>
            </Row>
        </Container>
    )
}

export default Store;