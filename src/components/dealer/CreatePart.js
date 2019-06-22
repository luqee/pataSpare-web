import React, { Component } from 'react';
import CreatePartForm from '../../forms/CreatePartForm';
class CreatePart extends Component {
    render = () => {
        return (
            <div className="create-part">
            <CreatePartForm history={this.props.history} shopId={this.props.match.params.id}/>
            </div>
        );
    }
}

export default CreatePart;