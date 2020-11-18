import React from 'react';
import { Route, Redirect } from 'react-router-dom';

let isLogin = ({computedMatch}) => {
    return localStorage.getItem('user') === computedMatch.params.profile_id;
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin(rest) ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;