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
            password,
            user
        } = this.state;

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

    test = () => {
        makeCall({
            method: 'GET',
            URL: 'http://localhost:3100/api/test-auth'
        }).then((response) => {
            console.log({
                response
            });
        }).catch((response) => {
            console.log('not authorized:', response);
        });
    }

    render() {
        const {
            isAuthenticated,
            password,
            user
        } = this.state;

        return (
            <>
                {
                    isAuthenticated
                        ? (
                            <Redirect to={'/dashboard'} />
                        )
                        : (
                            <>
                                <form onSubmit={this.handleSubmit}>
                                    <Input
                                        handleChange={this.handleChange}
                                        name={'user'}
                                        value={user}
                                    />
                                    <Input
                                        handleChange={this.handleChange}
                                        name={'password'}
                                        value={password}
                                    />
                                    <Button
                                        label={'Log In'}
                                        type={BUTTON_TYPE_SUBMIT}
                                    />
                                </form>
                                <Button
                                    handleClick={this.test}
                                    label={'test auth'}
                                    type={'button'}
                                />
                            </>
                        )
                }
            </>
        );
    }
}

export default LoginView;
