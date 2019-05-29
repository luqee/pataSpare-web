import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ShopItem from './ShopItem';
import {Button} from 'react-bootstrap';
class Shops extends Component {
    constructor(props){
        super(props);
        this.state = {
            shops: [],
        }
    }

    componentDidMount = () => {
        console.log('component did mount');
        axios.get('/auto_dealer/shops', {
            baseURL: 'http://127.0.0.1:8000/auto/api/v1',
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
                <Link to="dealer/shop/create">
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