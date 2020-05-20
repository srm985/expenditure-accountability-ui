import PropTypes from 'prop-types';
import {
    withRouter
} from 'react-router-dom';

import makeCall, {
    CALL_TYPE_GET
} from '../../utils/restful';

const SplitwiseView = (props) => {
    const {
        history
    } = props;

    const {
        location: {
            search: queryStrings
        }
    } = window;

    const extractedCode = queryStrings.replace('?code=', '').replace('&state=', '');

    setTimeout(() => {
        makeCall({
            method: CALL_TYPE_GET,
            URL: `/api/splitwise-token?code=${extractedCode}`
        }).then(() => {
            history.push('/');
        }).catch(() => {
            // No action needed.
        });
    }, 0);

    return null;
};

SplitwiseView.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

SplitwiseView.defaultProps = {
    history: {}
};

export default withRouter(SplitwiseView);
