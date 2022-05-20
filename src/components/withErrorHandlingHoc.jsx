import React from 'react';
import {Alert} from 'react-bootstrap';
const withErrorHandling = WrappedComponent => ({ showError, errors, children }) => {
    let errorLists = Object.values(errors)
    let allErrors = []
    for(let errorList in errorLists){
        allErrors = allErrors.concat(errorLists[errorList])
    }
    
    const errorsList = allErrors.map((error, indx) => {
        return (
            <li key={indx}>
                {error}
            </li>
        )
    })
    return (
        <WrappedComponent>
        {showError && <Alert className="error-message" variant="danger">
        <Alert.Heading>Oops! Something went wrong!</Alert.Heading>
        <ul>{errorsList}</ul>
        </Alert>}
        {children}
        </WrappedComponent>
    );
};

const DivWithErrorHandling = withErrorHandling(({children}) => <div>{children}</div>)
export default DivWithErrorHandling;