import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socialSignIn } from '../api/auth';
import { UserContext } from '../App'

function GoogleButton() {
    useEffect(()=>{
        if(!window.google){
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://accounts.google.com/gsi/client`;
            s.setAttribute('async', '')
            s.setAttribute('defer', '')
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                setupGoogleButton()
            })
        }else{
            setupGoogleButton();
        }
    }, [])
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const handleCredentialResponse = (response) => {
        let payload = {
            id_token: response.credential
        }
        socialSignIn(payload, (data) => {
            if (data.status === 200) {
                let user = data.data.user
                user.token = data.data.token
				userContext.updateUser(user)
                navigate(`/customer`)
            }
        })
    }

    const setupGoogleButton = ()=>{
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENT_ID,
            callback: handleCredentialResponse
        })
        window.google.accounts.id.renderButton(
            document.getElementById('googleButton'),
            {theme: "filled_blue", size: "large", shape: "pill"}
        )
        window.google.accounts.id.prompt(); // also display the One Tap dialog
    }

    return (
        <div id='googleButton'>
        </div>
    )
}

export default GoogleButton;
