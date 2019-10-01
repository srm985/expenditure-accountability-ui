import React from 'react';
import {
    Redirect
} from 'react-router-dom';

import authentication from '../../utils/authentication';
import makeCall, {
    CALL_TYPE_POST
} from '../../utils/restful';

import Button from '../../components/ButtonComponent';
import Grid from '../../components/GridComponent';
import GridItem from '../../components/GridItemComponent';
import Input from '../../components/InputComponent';

import {
    BUTTON_TYPE_SUBMIT
} from '../../components/ButtonComponent/config';
import {
    INPUT_TYPE_EMAIL,
    INPUT_TYPE_PASSWORD
} from '../../components/InputComponent/config';

import backgroundImage from '../../assets/chicago.jpg';

import './styles.scss';

class LoginView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hasEmptyField: false,
            hasInvalidCredentials: false,
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
            hasEmptyField: false,
            hasInvalidCredentials: false,
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

        if (!user || !password) {
            this.setState({
                hasEmptyField: true
            });
        } else {
            makeCall({
                method: CALL_TYPE_POST,
                payload: {
                    password,
                    user
                },
                URL: '/api/login'
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
            }).catch(() => {
                this.setState({
                    hasInvalidCredentials: true
                });
            });
        }
    }

    render() {
        const {
            state: {
                hasEmptyField,
                hasInvalidCredentials,
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
                        <Grid>
                            <GridItem
                                columns={{
                                    medium: [
                                        4,
                                        10
                                    ]
                                }}
                            >
                                <section>
                                    <h1 className={'mb--5'}>
                                        {'Expenditure Accountability'}
                                    </h1>
                                    <form
                                        className={`${displayName}__form`}
                                        onSubmit={this.handleSubmit}
                                    >

                                        <Input
                                            className={'mb--2'}
                                            handleChange={this.handleChange}
                                            label={'Email Address'}
                                            name={'user'}
                                            type={INPUT_TYPE_EMAIL}
                                            value={user}
                                        />
                                        <Input
                                            className={'mb--4'}
                                            handleChange={this.handleChange}
                                            label={'Password'}
                                            name={'password'}
                                            type={INPUT_TYPE_PASSWORD}
                                            value={password}
                                        />
                                        <Button
                                            isFullWidth
                                            label={'Log In'}
                                            type={BUTTON_TYPE_SUBMIT}
                                        />
                                        {
                                            hasInvalidCredentials
                                            && (
                                                <p className={`${displayName}__warning-message`}>
                                                    {'The email address or password you have entered is invalid.'}
                                                </p>
                                            )
                                        }
                                        {
                                            hasEmptyField
                                            && (
                                                <p className={`${displayName}__warning-message`}>
                                                    {'Please ensure all fields have been entered.'}
                                                </p>
                                            )
                                        }
                                    </form>
                                </section>
                            </GridItem>
                        </Grid>
                    </main>
                )
        );
    }
}

LoginView.displayName = 'LoginView';

export default LoginView;
