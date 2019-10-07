import React, {Component} from 'react';
import autoAPI from '../../api/api';
import InquiriesTable from '../InquiriesTable';

class Inquiries extends Component {
    constructor(props){
        super(props);
        this.state = {
            inquiries: [],
        }
    }

    componentDidMount = () => {
        autoAPI.get(`/inquiries`, {
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
        return <InquiriesTable inquiries={inquiries} />
    };
}

export default Inquiries;
