import React, { Component } from 'react';

class DealerLoginForm extends Component {
  render() {
    return (
        <div className='form-wraper'>
        <form>
          <input type='text' name='email' placeholder='E-mail address' />
          <input type='password' name='password' />
          <input type='button' name='login_button' value='Login' />
        </form>
        </div>
    );
  }
}

export default DealerLoginForm;