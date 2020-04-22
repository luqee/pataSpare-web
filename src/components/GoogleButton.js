import React from 'react';
import autoAPI from '../api/api';
import Loader from './Loader';

class GoogleButton extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount = () => {
        window['onSignIn'] = this.onSignIn;
        if(!window.gapi){
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://apis.google.com/js/platform.js`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.renderGoogleButton();
            })
        }else{
            this.renderGoogleButton();
        }
    }
    renderGoogleButton = () => {
        window.gapi.signin2.render('g-signin2', {})
    }
    componentWillUnmount = () => {
        delete window['onSignIn'];
    }
    onSignIn = (googleUser) => {
        let profile = googleUser.getBasicProfile()
        let info = {
            'username': profile.getName(),
            'email': profile.getEmail(),
            'id_token': googleUser.getAuthResponse().id_token
        }
        autoAPI.post(`/auth/social/google`, JSON.stringify(info))
        .then(response => {
            if (response.data.status === 200) {
                let responseData = response.data.data;
				this.props.userContext.updateUser(responseData.user)
                this.props.userContext.updateToken(responseData.token)
                console.log('match prop in auth');
                console.log(this.props.match);
                this.props.history.push(`/customer`);
            }
        })
        .catch((error) => {
            console.log('An Error while authenticating');
            console.log(error);

        });
    }
    render = () => {
        return (
            <div className="g-signin2" data-onsuccess='onSignIn' data-width='inherit' data-longtitle='true'>
            </div>
        )
    }
}

export default GoogleButton;
