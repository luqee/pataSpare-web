import React from 'react'
const withErrorHandling = WrappedComponent => ({ showError, errors, children }) => {
    let errorLists = Object.values(errors)
    let allErrors = []
    for(let errorList in errorLists){
        allErrors = allErrors.concat(errorLists[errorList])
    }
    // console.log('handling error');
    console.log(allErrors);
    
    const errorsList = allErrors.map((error, indx) => {
        return (
            <li key={indx}>
                {error}
            </li>
        )
    })
    return (
        <WrappedComponent>
        {showError && <div className="error-message">Oops! Something went wrong!<br /><ul>{errorsList}</ul></div>}
        {children}
        </WrappedComponent>
    );
};

export default withErrorHandling;