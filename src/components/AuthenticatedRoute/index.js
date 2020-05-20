import React from 'react';
import {
    Redirect,
    Route
} from 'react-router-dom';

import authentication from '../../utils/authentication';

const AuthenticatedRoute = (routeProps) => {
    const {
        component: Component,
        ...remainingProps
    } = routeProps;

    const handleRender = (componentProps) => {
        const {
            location
        } = componentProps;

        return (
            authentication.verify()
                ? (
                    <Component {...componentProps} />
                )
                : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: location
                            }
                        }}
                    />
                )
        );
    };

    return (
        <Route
            {...remainingProps}
            render={handleRender}
        />
    );
};

export default AuthenticatedRoute;
