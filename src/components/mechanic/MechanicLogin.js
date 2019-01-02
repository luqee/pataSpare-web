import React, { Component } from 'react';
import MechanicLoginForm from '../../forms/MechanicLoginForm'

class MechanicLogin extends Component {
    render(){
        return (
            <div className='mechanic-login'>
                <p>Mechanic Login Page</p>
                <MechanicLoginForm />
            </div>
        );
    }
}

export default MechanicLogin;