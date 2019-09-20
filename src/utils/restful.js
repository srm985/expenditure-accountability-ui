import authentication from './authentication';

export const CALL_TYPE_POST = 'POST';
export const CALL_TYPE_GET = 'GET';

const makeCall = (parameters) => new Promise((resolve, reject) => {
    const {
        payload,
        method,
        URL
    } = parameters;

    const token = authentication.retrieve();

    const headers = new Headers({
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json'
    });

    const body = payload ? JSON.stringify(payload) : undefined;

    fetch(URL, {
        body,
        headers,
        method
    }).then((response) => {
        const {
            ok
        } = response;

        if (ok) {
            resolve(response.json());
        } else {
            reject(response);
        }
    }).catch((response) => {
        reject(response);
    });
});

export default makeCall;
