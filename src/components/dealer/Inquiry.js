import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

function Inquiry(props){
    let replies = props.inquiry.replies
    let num_of_replies = 0
    if(replies && replies.length > 0){
        num_of_replies = replies.length
    }
    return (
        <tr>
            <td>{props.inquiry.query}</td>
            <td>{props.inquiry.part.name}</td>
            <td>{props.inquiry.part.shop.name}</td>
            <td>{num_of_replies}</td>
            <td>
            <Link to={{
                pathname: `${props.match.url}/${props.inquiry.id}`,
                state: {inquiry: props.inquiry }
            }}>
            <Button>View</Button>
            </Link>
                
            </td>
        </tr>
    )
}

export default Inquiry;
