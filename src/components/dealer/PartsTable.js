import React from 'react';
import {Link} from 'react-router-dom';
import {Image, Button, Table} from 'react-bootstrap';
import urls from '../../config/config';

function PartsTable(props){
    let parts = props.parts
    return (
        parts.length > 0 ?
        <Table>
            <thead>
                <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                parts.map((part, indx) => {
                    return <tr key={indx}>
                        <td><Image width='100' height='100' src={`${urls.hostRoot}/${part.part_image}`} rounded /></td>
                        <td>{part.title}</td>
                        <td>{part.price}</td>
                        <td>{part.stock}</td>
                        <td>
                            <Link to={{
                                pathname: '/dealer/inventory/'+part.id,
                                state: {part: part, from: props.match.url}
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
        <p>No Inventory</p>
    )
}

export default PartsTable;
