import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import PartItem from './PartItem';

class Inventory extends Component{
    render = () => {
        return (
            <div className="Inventory">
            <Link to={"/dealer/shops/"+this.props.shopId+"/part/create"}>
                <Button>ADD PART</Button>
            </Link>
            <div className="parts">
            {
                (this.props.parts.length > 0) ? (
                    this.props.parts.map((part) => {
                    return (<PartItem key={part.id} part={part}/>)
                })
                )
                :
                (<div>
                    YOU CURRENTLY DON’T HAVE PARTS IN THIS STORE
                </div>
                )
            }
            </div>
            </div>
        )
    }
}

export default Inventory;