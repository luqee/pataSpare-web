import React, { Component } from 'react';
import GarrageOwnerRegisterForm from '../../forms/GarrageOwnerRegisterForm'

class GarrageOwnerRegister extends Component {
    render(){
        return (
            <div className='garrage-register'>
                <p>Garrage Owner Register Page</p>
                <GarrageOwnerRegisterForm />
            </div>
        );
    }
}

export default GarrageOwnerRegister;