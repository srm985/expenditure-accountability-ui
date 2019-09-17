import React from 'react';
import ReactDOM from 'react-dom';

import Login from './views/LoginView';

ReactDOM.render(
    <Login />,
    document.getElementById('app')
);

module.hot.accept();
