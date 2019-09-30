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
import Grid from '../../components/GridComponent';
import GridItem from '../../components/GridItemComponent';
import Input from '../../components/InputComponent';

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
        }).catch(() => {
            // TODO: Handle invalid attempt.
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
