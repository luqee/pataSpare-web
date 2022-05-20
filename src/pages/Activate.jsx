import { useEffect, useState } from 'react';
import {Container, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import queryString from 'query-string';
import { getVerifyMail } from '../api/auth';
import { useLocation, useNavigate } from 'react-router-dom';

function Activate() {
    const [loading, setLoading] = useState(true)
    let location = useLocation()
    let navigate = useNavigate()
    useEffect(()=>{
        let requestUrl = queryString.parse(location.search).q
        getVerifyMail(requestUrl, (response) => {
            if (response.status === 200){
                setLoading(false)
                navigate(`/auth/login`)
            }else {
                setLoading(false)
                console.log('Error activating');
            }
        })
    }, [])
    return (
        <Container>
            <Row style={{
                justifyContent: 'center'
            }}>
            <Loader loading={loading} />
            {
                (loading) ? (
                    <p>Email being verified, you will be redirected...</p>
                ):( !loading && <p>Verification failed.</p>
                )
            }
            </Row>
        </Container>
    )
}

export default Activate;
