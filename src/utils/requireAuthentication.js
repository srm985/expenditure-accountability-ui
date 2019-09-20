import authentication from './authentication';

const requireAuthentication = (nextState, replace, next) => {
    if (!authentication.verify()) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }

    next();
};

export default requireAuthentication;
