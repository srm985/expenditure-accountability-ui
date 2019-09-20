import {
    LOCAL_STORAGE_TOKEN
} from '../constants';

const authentication = {
    authenticate: (token) => {
        window.localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    },

    clear: () => {
        window.localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    },

    retrieve: () => window.localStorage.getItem(LOCAL_STORAGE_TOKEN),

    verify: () => !!window.localStorage.getItem(LOCAL_STORAGE_TOKEN)
};

export default authentication;
