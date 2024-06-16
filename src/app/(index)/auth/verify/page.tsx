import {Container, Row} from 'react-bootstrap'
import Loader from '@/components/Loader'
import { verifyAction } from '@/actions/auth';

const Activate =({searchParams}:{searchParams: {q:string}})=>{
    verifyAction(searchParams.q)

    return (
        <Container>
            <Row style={{
                justifyContent: 'center'
            }}>
                <p>Email being verified, you will be redirected...</p>
            {/* <Loader loading={loading} /> */}
            {/* {
                (loading) ? (
                    
                ):( !loading && <p>Verification failed.</p>
                )
            } */}
            </Row>
        </Container>
    )
}

export default Activate;
