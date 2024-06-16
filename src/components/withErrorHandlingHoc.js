import {Alert} from 'react-bootstrap';
const withErrorHandling = WrappedComponent => ({ showError, errors, children }) => {

    const displayErrors = ()=>{
        let errorLists = Object.entries(errors).map((error, idx)=>{
            return (<div key={idx}>
                <p key={idx + 'p'}>{error[0]}</p>
                <ul key={idx}>
                    <li>{error[1]}</li>
                </ul>
            </div>
            )
        })
        return errorLists
    }

    return (
        <WrappedComponent>
        {showError && <Alert className="error-message" variant="danger">
        <Alert.Heading>Oops! Something went wrong!</Alert.Heading>
        {displayErrors()}
        </Alert>}
        {children}
        </WrappedComponent>
    );
};

const DivWithErrorHandling = withErrorHandling(({children}) => <div>{children}</div>)
export default DivWithErrorHandling;