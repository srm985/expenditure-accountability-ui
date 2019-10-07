import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';

const TRACKING_ID = 'UA-86885981-4';

class AnalyticsComponent extends React.Component {
    componentDidMount() {
        const {
            props: {
                history: {
                    listen: historyListen = () => { }
                } = {},
                location: {
                    pathname = ''
                } = {}
            }
        } = this;

        ReactGA.initialize(TRACKING_ID);

        this.updateAnalytics(pathname);

        historyListen((location) => {
            const {
                pathname: currentPage
            } = location;

            this.updateAnalytics(currentPage);
        });
    }

    updateAnalytics = (page = '') => {
        ReactGA.set({
            page
        });

        ReactGA.pageview(page);
    }

    render() {
        return null;
    }
}

AnalyticsComponent.propTypes = {
    history: PropTypes.shape({
        listen: PropTypes.func
    }),
    location: PropTypes.shape({
        pathname: PropTypes.string
    })
};

AnalyticsComponent.defaultProps = {
    history: {},
    location: {}
};

export default AnalyticsComponent;
