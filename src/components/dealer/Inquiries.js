import React, {Component} from 'react';
import autoAPI from '../../api/api';
import urls from '../../config/config';
import InquiriesTable from '../InquiriesTable';

class Inquiries extends Component {
    constructor(props){
        super(props);
        this.state = {
            inquiries: [],
        }
    }

    componentDidMount = () => {
        autoAPI.get(`${urls.dealerHome}/inquiries`, {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            
            if (response.data.status === 200){
                
                this.setState({inquiries: response.data.data.inquiries});
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }

    render = () => {
        const inquiries = this.state.inquiries;
        return (inquiries.length > 0) ? (
            <InquiriesTable inquiries={inquiries} />
        ):(
            <p>No Inquiries</p>
        );
    };
}

export default Inquiries;
