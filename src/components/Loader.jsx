import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader';

function Loader(props){
    return (
        <PropagateLoader
            color={'#007bff'}
            loading={props.loading}
        />
    )
}

export default Loader;