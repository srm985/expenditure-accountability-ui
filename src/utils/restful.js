import authentication from './authentication';

import loadingIndicator from './loadingIndicator';

export const CALL_TYPE_DELETE = 'DELETE';
export const CALL_TYPE_GET = 'GET';
export const CALL_TYPE_POST = 'POST';
export const CALL_TYPE_PUT = 'PUT';

const makeCall = (parameters) => new Promise((resolve, reject) => {
    const {
        method,
        payload,
        URL
    } = parameters;

    const {
        location: {
            origin
        }
    } = window;

    const baseURL = origin.replace(/:\d+$/, '');

    const token = authentication.retrieve();

    const headers = new Headers({
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json'
    });

    const body = payload ? JSON.stringify(payload) : undefined;

    loadingIndicator.show();

    // We assume our API will be on port 3100.
    fetch(`${baseURL}:3100${URL}`, {
        body,
        headers,
        method
    }).then((response = {}) => {
        const {
            ok,
            status
        } = response;

        if (status === 401) {
            authentication.clear();
            window.location.href = '/login';
        } else if (ok) {
            response.json().then((data) => {
                resolve(JSON.parse(JSON.stringify(data)));
            });
        } else {
            reject(response);
        }
    }).catch((response) => {
        reject(response);
    }).finally(() => {
        loadingIndicator.hide();
    });
});

export default makeCall;
