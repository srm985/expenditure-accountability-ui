import {
    LOCAL_STORAGE_TOKEN
} from '../constants';

export const CALL_TYPE_POST = 'POST';
export const CALL_TYPE_GET = 'GET';

const fetchToken = () => window.localStorage.getItem(LOCAL_STORAGE_TOKEN);

export const makeCall = (parameters) => new Promise((resolve, reject) => {
    const {
        payload,
        method,
        URL
    } = parameters;

    const token = fetchToken();

    const headers = new Headers({
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json'
    });

    const body = payload ? JSON.stringify(payload) : undefined;

    console.log({
        parameters,
        token
    });

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
