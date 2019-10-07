import React, {useState} from 'react';
import {Image, Button} from 'react-bootstrap';
import urls from '../../config/config';
import Select from 'react-select';
import autoAPI from '../../api/api';

function OrderItem(props){
    const [status,setStatus] = useState({
        value: props.item.status,
        label: props.item.status,
    })
    let options = ['processing', 'completed', 'cancelled']
    let statusOptions = options.map((item) => {
        return {
            value: item,
            label: item
        }
    })
    const handleStatus = (value) => {
        setStatus(value);
    }
    const changeStatus = () => {
        let postData = {
            status: status
        }
        autoAPI.put(`${urls.dealerHome}/${props.item.id}`, JSON.stringify(postData))
        .then((response) => {
            console.log(response);
            if (response.status === 200){
                // this.setState({brandOptions: response.data.data.order_items})
                props.history.push('')
                props.history.push(props.history.location.pathname)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <tr>
            <td><Image width={'60px'} height={'60px'} src={`${urls.hostRoot}/${props.item.part.part_image}`} /> </td>
            <td>{props.item.part.title}</td>
            <td>{props.item.shop.name}</td>
            <td>{props.item.price}</td>
            <td>{props.item.quantity}</td>
            <td>{props.item.quantity * props.item.price}</td>
            <td>
            <Select
                placeholder={`Status`}
                options={statusOptions}
                onChange={handleStatus}
                value={status}
            />
                <Button onClick={changeStatus}>Update</Button>
            </td>
        </tr>
    )
}

export default OrderItem;