import React, { Component } from 'react';

class GarrageOwnerRegisterForm extends Component {
  render() {
    return (
        <div className='form-wraper'>
        <form>
          <input type='text' name='username' placeholder='User Name' />
          <input type='text' name='number' placeholder='Number' />
          <input type='text' name='email_address' placeholder='E-mail address' />
          <input type='password' name='password' />
          <input type='password' name='conf_password'  />
          <input type='button' name='sign_up_button' value='Register' />
        </form>
        </div>
    );
  }
}

export default GarrageOwnerRegisterForm;