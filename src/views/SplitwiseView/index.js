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

    console.log({
        queryStrings
    });

    const extractedCode = queryStrings.replace('?code=', '').replace('&state=', '');

    makeCall({
        method: CALL_TYPE_GET,
        URL: `http://localhost:3100/api/splitwise-token?code=${extractedCode}`
    }).then(() => {
        console.group('pushing...');
        history.push('/');
    }).catch((error) => {
        console.log('error!', error);
    });

    return null;
};

export default withRouter(SplitwiseView);
