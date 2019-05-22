import React, { Component } from 'react';
import DealerLoginForm from '../../forms/DealerLoginForm';

class DealerLogin extends Component {
    render(){
        return (
            <div className='dealer-login'>
                <p>Dealer Login Page</p>
                <DealerLoginForm history={this.props.history} />
            </div>
        );
    }
}

export default DealerLogin;