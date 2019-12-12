import React from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function InquiriesTable(props){
    let inquiries = props.inquiries
    return (
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
                    let num_of_replies = 0
                    if(inquiry.replies && inquiry.replies.length > 0){
                        num_of_replies = inquiry.replies.length
                    }
                    return <tr key={indx}>
                        <td>{inquiry.query}</td>
                        <td>{(inquiry.part === null) ? '-': inquiry.part.name}</td>
                        <td>{(inquiry.shop === null) ? '-': inquiry.shop.name}</td>
                        <td>{num_of_replies}</td>
                        <td>
                        <Link to={{
                            pathname: `${props.match.url}/${inquiry.id}`,
                            state: {inquiry: inquiry }
                        }}>
                        <Button>View</Button>
                        </Link>
                            
                        </td>
                    </tr>
                    })
            }
            </tbody>
        </Table>
        :
        <p>No Inquiries</p>
    )
}

export default InquiriesTable;