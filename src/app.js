import React from 'react';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Dashboard from './views/DashboardView';
import Login from './views/LoginView';
import NotFound from './views/NotFoundView';

import AuthenticatedRoute from './components/AuthenticatedRoute';

import requireAuthentication from './utils/requireAuthentication';

import './styles/styles.scss';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Redirect
                exact
                from={'/'}
                to={'/dashboard'}
            />
            <Route
                component={Login}
                path={'/login'}
            />
            <AuthenticatedRoute
                component={Dashboard}
                onEnter={requireAuthentication}
                path={'/dashboard'}
            />
            <Route
                component={NotFound}
            />
        </Switch>
    </BrowserRouter>
);

export default App;
