import { useAuthContext } from '@/context/AuthContext'
import { useEffect } from 'react'

export const GoogleButton = ({dcx})=>{
    const {socialLogin} = useAuthContext()

    useEffect(()=>{
        setupButton()
        return ()=>{
            delete window['onSignIn'];
        }
    }, [])

    const setupButton = () => {
        window['onSignIn'] = onSignIn;
        if(!window.gapi){
            console.log('loading gsi client');
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://accounts.google.com/gsi/client`;
            s.async = true
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                console.log('gsi client loaded');
            })
        }
        console.log('gsi client already present');
    }

    const onSignIn = (response) => {
        let info = {
            'provider': 'google',
            'id_token': response.credential
        }
        socialLogin(info)
    }
    
    return (
        <div>
            <div id="g_id_onload"
                data-client_id={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
                data-context={dcx}
                data-ux_mode="popup"
                data-callback="onSignIn"
                data-auto_select="true"
                data-itp_support="true">
            </div>

            <div className="g_id_signin"
                data-type="standard"
                data-shape="pill"
                data-theme="filled_blue"
                data-text="signup_with"
                data-size="medium"
                data-logo_alignment="left">
            </div>
        </div>
    )
}
