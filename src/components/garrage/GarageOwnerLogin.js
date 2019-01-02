import React, { Component } from 'react';
import GarrageOwnerLoginForm from '../../forms/GarrageOwnerLoginForm'

class GarrageOwnerLogin extends Component {
    render(){
        return (
            <div className='garrage-login'>
                <p>Garrage Owner Login Page</p>
                <GarrageOwnerLoginForm />
            </div>
        );
    }
}

export default GarrageOwnerLogin;