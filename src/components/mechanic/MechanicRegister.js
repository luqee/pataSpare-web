import React, { Component } from 'react';
import MechanicRegisterForm from '../../forms/MechanicRegisterForm'

class MechanicRegister extends Component {
    render(){
        return (
            <div className='mechanic-register'>
                <p>Mechanic register Page</p>
                <MechanicRegisterForm />
            </div>
        );
    }
}

export default MechanicRegister;