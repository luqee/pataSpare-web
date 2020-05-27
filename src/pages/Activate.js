import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import autoAPI from '../api/api';
import Loader from '../components/Loader';
import queryString from 'query-string';

class Activate extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount = () => {
        if(this.props.location.search !== ''){
            let parsed = queryString.parse(this.props.location.search)
            autoAPI.get(parsed.q)
            .then((response) => {
                if (response.status === 200){
                    this.setState({loading: false})
                    this.props.history.push(`/user/login`)
                }else {
                    console.log('Error activating');
                    this.setState({loading: false})
                }
            })
            .catch((error) => {
                console.log(`Caught error--> ${error}`);
                this.setState({loading: false})
            });
        }

    }
    render() {
        return (
            <Container>
                <Row style={{
                    justifyContent: 'center'
                }}>
                <Loader loading={this.state.loading} />
                {
                    (this.state.loading) ? (
                        <p>Email being verified, you will be redirected...</p>
                    ):( !this.state.loading && <p>Verification failed.</p>
                    )
                }
                </Row>
            </Container>
        )
    }
}

export default Activate;
