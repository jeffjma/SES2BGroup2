import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        // If user is authenticated then render componet else return to landing page from the location
        // where protected route was called
        <Route {...rest} render={(props) => {
            if (isAuth) {
                return <Component />
            } else {
                return  <Redirect to={{pathname: '/', state: { from: props.location }}}/>
            }
        }} />
    )
}

export default ProtectedRoute;