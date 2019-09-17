import React from 'react';

import {
    CALL_TYPE_POST,
    makeCall
} from '../../utils/restful';

import {
    BUTTON_TYPE_SUBMIT
} from '../../components/ButtonComponent/config';

import Button from '../../components/ButtonComponent';
import Input from '../../components/InputComponent';

import {
    LOCAL_STORAGE_TOKEN
} from '../../constants';

class LoginView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            user: ''
        };
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

            window.localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
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
            password,
            user
        } = this.state;

        return (
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
        );
    }
}

export default LoginView;
