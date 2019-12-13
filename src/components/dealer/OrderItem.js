import React, {useState, useContext} from 'react';
import {Image, Button} from 'react-bootstrap';
import urls from '../../config/config';
import Select from 'react-select';
import autoAPI from '../../api/api';
import { UserContext } from '../../App';

function OrderItem(props){
    let [item, setItem] = useState(props.item)
    let [status, setStatus] = useState({
        value: item.status,
        label: item.status,
    })
    let [statusChanged, setStatusChanged] = useState(false)
    let [updating, setUpdating] = useState(false)
    let options = ['processing', 'completed', 'cancelled']
    let statusOptions = options.map((item) => {
        return {
            value: item,
            label: item
        }
    })
    const userContext = useContext(UserContext)
    const handleStatus = (selected) => {
        if(selected.value !== item.status){
            setStatusChanged(true)
        }else{
            setStatusChanged(false)
        }
        setStatus(selected);
    }
    const changeStatus = () => {
        setUpdating(true)
        let postData = {
            status: status.value
        }
        autoAPI.put(`/dealer/orders/${item.id}`, JSON.stringify(postData), {
            headers: {'Authorization': 'Bearer '+ userContext.token}
        })
        .then((response) => {
            if (response.status === 200){
                setUpdating(false)
                setItem(response.data.data.order_item)
                setStatusChanged(false)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return <tr>
            <td><Image width={'60px'} height={'60px'} src={`${urls.hostRoot}/${item.part.part_image}`} /> </td>
            <td>{item.part.title}</td>
            <td>{item.shop.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.quantity * item.price}</td>
            <td>
                <div style={{
                    display: 'flex'
                }}>
                    <div style={{
                        width: `125px`
                    }}>
                        <Select
                            placeholder={`Status`}
                            options={statusOptions}
                            onChange={handleStatus}
                            value={status}
                        />
                    </div>
                <span>{`  `}</span>
                <Button size={"sm"} onClick={changeStatus} disabled={(!statusChanged)? true: false}>{updating?'Updating':'Update'}</Button>
                </div>
            </td>
        </tr>
}

export default OrderItem;