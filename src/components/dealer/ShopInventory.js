import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import PartItem from './PartItem';

class ShopInventory extends Component{
    render = () => {
        return (
            <Container className="Inventory">
                <Row>
                    <Col>
                    <Link style={{
                        float:"right"
                    }} to={"/dealer/shops/manage/"+this.props.shopId+"/part/create"}>
                        <Button>ADD PART</Button>
                    </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div className="parts">
                    {
                        (this.props.parts.length > 0) ? (
                            this.props.parts.map((part) => {
                            return (<PartItem key={part.id} part={part}/>)
                        })
                        )
                        :
                        (<div>
                            YOU CURRENTLY DON’T HAVE PARTS IN THIS STORE
                        </div>
                        )
                    }
                    </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ShopInventory;
