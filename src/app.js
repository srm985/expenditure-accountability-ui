import React from 'react';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import BulkEntry from './views/BulkEntryView';
import Dashboard from './views/DashboardView';
import Enroll from './views/EnrollView';
import Login from './views/LoginView';
import NotFound from './views/NotFoundView';
import Splitwise from './views/SplitwiseView';
import UpdatePassword from './views/UpdatePasswordView';

import Analytics from './components/AnalyticsComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import LoadingIndicator from './components/LoadingIndicatorComponent';

import requireAuthentication from './utils/requireAuthentication';

import './styles/styles.scss';

const App = () => (
    <>
        <BrowserRouter>
            <Route component={Analytics} />
            <Switch>
                <Redirect
                    exact
                    from={'/'}
                    to={'/dashboard'}
                />
                <Route
                    component={Enroll}
                    path={'/enroll'}
                />
                <Route
                    component={Login}
                    path={'/login'}
                />
                <AuthenticatedRoute
                    component={UpdatePassword}
                    path={'/update-password'}
                />
                <AuthenticatedRoute
                    component={Dashboard}
                    onEnter={requireAuthentication}
                    path={'/dashboard'}
                />
                <AuthenticatedRoute
                    component={Splitwise}
                    onEnter={requireAuthentication}
                    path={'/splitwise'}
                />
                <AuthenticatedRoute
                    component={BulkEntry}
                    onEnter={requireAuthentication}
                    path={'/bulk-entry'}
                />
                <Route
                    component={NotFound}
                />
            </Switch>
        </BrowserRouter>
        <LoadingIndicator />
    </>
);

export default App;
