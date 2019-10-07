import React, {Component} from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import Inquiry from './Inquiry';

function InquiriesTable(props){
    let inquiries = props.inquiries
    return (
        <Container className="inquiries">
            <Row>
            <Col>
            {
                inquiries.length > 0 ?
                <Table>
                    <thead>
                        <tr>
                        <th>Query</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Replies</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        inquiries.map((inquiry, indx) => {
                            return <Inquiry key={indx} match={props.match} inquiry={inquiry}/>
                            })
                    }
                    </tbody>
                </Table>
                :
                <p>No Inquiries</p>
            }
            </Col>
            </Row>
        </Container>
    )
}

export default InquiriesTable;