import React from 'react';
import {Link} from 'react-router-dom';
import {Image, Button, Table} from 'react-bootstrap';
import urls from '../../config/config';

function ShopsTable(props){
    let shops = props.shops;
    return (
        shops.length > 0 ?
        <Table>
            <thead>
                <tr>
                <th></th>
                <th>Name</th>
                <th>location</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                shops.map((shop, indx) => {
                    return <tr key={indx}>
                        <td><Image width='100' height='100' src={`${urls.hostRoot}/${shop.shop_image}`} rounded /></td>
                        <td>{shop.name}</td>
                        <td>{shop.location}</td>
                        <td><Link to={{
                            pathname: `${props.match.url}/manage/${shop.id}`,
                            state: {shop: shop}
                        }}>
                                <Button>MANAGE</Button>
                            </Link>
                        </td>
                    </tr>
                    })
            }
            </tbody>
        </Table>
        :
        <p>YOU CURRENTLY DON’T OWN A SHOP</p>
    )
}

export default ShopsTable;
