import React, { Component } from 'react';
import DealerRegisterForm from '../../forms/DealerRegisterForm';

class DealerRegister extends Component {
    render(){
        return (
            <div className='dealer-home'>
                <p>Dealer Registration</p>
                <DealerRegisterForm />
            </div>
        );
    }
}

export default DealerRegister;