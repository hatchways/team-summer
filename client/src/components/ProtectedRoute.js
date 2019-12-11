import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withPageContext } from '../components/pageContext';

class ProtectedRoute extends Component {

    handleUnAuth = (activateToast, location) => {
        activateToast('that was a fail', 'error')
        return (
            <Redirect to={{
                pathname: '/login',
                state: { referrer: location.pathname }
            }} />
        )
    }

    render() {
        const { 
            location,
            activateToast,
            userAuthenticated, 
            component: Component, ...rest } = this.props
        
        return (
            <Route
                {...rest}
                render={(props) => (
                    userAuthenticated
                        ? <Component {...props} />
                        : this.handleUnAuth(activateToast, location)
                )}
            />
        );
    }
}

export default withPageContext(ProtectedRoute);

// Render a Route to the desired path rather than preventing it from rendering at all
// because this won't cause issues with non-matching routesin a Switch. 
// Setup render prop to make determination about what component to render.
