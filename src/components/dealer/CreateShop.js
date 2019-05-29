import React, { Component } from 'react';
import CreateShopForm from '../../forms/CreateShopForm';
class CreateShop extends Component {
    render = () => {
        return (
            <div className="create-shop">
            <CreateShopForm history={this.props.history}/>
            </div>
        );
    }
}

export default CreateShop;