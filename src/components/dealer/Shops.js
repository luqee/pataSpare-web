import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ShopItem from './ShopItem';
import {Button} from 'react-bootstrap';
import autoAPI from '../../api/api';

class Shops extends Component {
    constructor(props){
        super(props);
        this.state = {
            shops: [],
        }
    }

    componentDidMount = () => {
        console.log('component did mount');
        autoAPI.get('/auto_dealer/shops', {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            console.log(response);
            if (response.data.status === 200){
                console.log('updating shops state');
                this.setState({shops: response.data.data[0].shops});
            }
        })
        .catch((error) => {
            console.log(error);
            
        });
    }
    
    render = () => {
        
        return (
            <div className="shops-content">
                <Link to={'/dealer/shops/create'}>
                <Button>ADD SHOP</Button>
                </Link>
                <div className="shops">
                {
                   (this.state.shops.length > 0) ? (
                    this.state.shops.map((shop) => {
                        console.log(shop);
                        return (<ShopItem key={shop.id} shop={shop}/>)
                    })
                   )
                   :
                   (<div>
                        YOU CURRENTLY DON’T OWN A SHOP
                    </div>
                    )
                }
                </div>
            </div>
        )
    };
}
export default Shops;