import React, {Component} from 'react'
import { Container } from 'react-bootstrap';
class InventoryItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            part: props.location.state? props.location.state.part: {}
        }
    }
    render = ()=>{
        return(
            <Container>
                {`${this.state.part.title}'s Details`}
            </Container>
        )
    }
}
export default InventoryItem