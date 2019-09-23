import React from 'react';
import {
    Redirect
} from 'react-router-dom';

import authentication from '../../utils/authentication';
import makeCall, {
    CALL_TYPE_POST
} from '../../utils/restful';

import {
    BUTTON_TYPE_SUBMIT
} from '../../components/ButtonComponent/config';

import Button from '../../components/ButtonComponent';
import Input from '../../components/InputComponent';

import {
    INPUT_TYPE_PASSWORD
} from '../../components/InputComponent/config';

import backgroundImage from '../../assets/skyline.jpg';

import './styles.scss';

class LoginView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            password: '',
            user: ''
        };
    }

    componentDidMount() {
        this.setState({
            isAuthenticated: authentication.verify()
        });
    }

    handleChange = (event) => {
        const {
            target: {
                name,
                value
            }
        } = event;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        const {
            state: {
                password,
                user
            }
        } = this;

        event.preventDefault();

        makeCall({
            method: CALL_TYPE_POST,
            payload: {
                password,
                user
            },
            URL: 'http://localhost:3100/api/login'
        }).then((response) => {
            const {
                token
            } = response;

            // If we receive a valid token, store it.
            if (token) {
                authentication.authenticate(token);

                this.setState({
                    isAuthenticated: true
                });
            }
        }).catch((response) => {
            console.log('error:', response);
        });
    }

    render() {
        const {
            state: {
                isAuthenticated,
                password,
                user
            }
        } = this;

        const {
            displayName
        } = LoginView;

        return (
            isAuthenticated
                ? (
                    <Redirect to={'/dashboard'} />
                )
                : (
                    <main
                        className={displayName}
                        style={{
                            backgroundImage: `url('${backgroundImage}')`
                        }}
                    >
                        <h1>
                            {'Expenditure Accountability'}
                        </h1>
                        <form
                            onSubmit={this.handleSubmit}
                        >

                            <Input
                                handleChange={this.handleChange}
                                label={'Email Address'}
                                name={'user'}
                                value={user}
                            />
                            <Input
                                handleChange={this.handleChange}
                                label={'Password'}
                                name={'password'}
                                type={INPUT_TYPE_PASSWORD}
                                value={password}
                            />
                            <Button
                                label={'Log In'}
                                type={BUTTON_TYPE_SUBMIT}
                            />
                        </form>
                    </main>
                )
        );
    }
}

LoginView.displayName = 'LoginView';

export default LoginView;
