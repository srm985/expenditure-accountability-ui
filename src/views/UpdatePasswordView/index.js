import PropTypes from 'prop-types';
import React from 'react';
import {
    withRouter
} from 'react-router-dom';

import Button from '../../components/ButtonComponent';
import Card from '../../components/CardComponent';
import Grid from '../../components/GridComponent';
import GridItem from '../../components/GridItemComponent';
import Input from '../../components/InputComponent';

import {
    BUTTON_TYPE_SUBMIT
} from '../../components/ButtonComponent/config';
import {
    INPUT_TYPE_PASSWORD
} from '../../components/InputComponent/config';

import makeCall, {
    CALL_TYPE_POST
} from '../../utils/restful';

import backgroundImage from '../../assets/chicago.jpg';

import './styles.scss';

class UpdatePasswordView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doPasswordsMatch: true,
            existingPassword: '',
            newPassword: '',
            newPasswordVerify: ''
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
            props: {
                history
            },
            state: {
                existingPassword,
                newPassword,
                newPasswordVerify
            }
        } = this;

        event.preventDefault();

        if (existingPassword && newPassword && newPasswordVerify) {
            if (newPassword === newPasswordVerify) {
                makeCall({
                    method: CALL_TYPE_POST,
                    payload: {
                        existingPassword,
                        newPassword
                    },
                    URL: '/api/update-password'
                }).then(() => {
                    history.push('/');
                }).catch(() => {
                    // Not going to handle invalid enrollment.
                });
            } else {
                this.setState({
                    doPasswordsMatch: false
                });
            }
        }
    }

    render() {
        const {
            state: {
                doPasswordsMatch,
                existingPassword,
                newPassword,
                newPasswordVerify
            }
        } = this;

        const {
            displayName
        } = UpdatePasswordView;

        return (
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
                        <Card>
                            <h1 className={'mb--5'}>
                                {'Update Password'}
                            </h1>
                            <form onSubmit={this.handleSubmit}>
                                <Input
                                    className={'mb--3'}
                                    handleChange={this.handleChange}
                                    label={'Existing Password'}
                                    name={'existingPassword'}
                                    type={INPUT_TYPE_PASSWORD}
                                    value={existingPassword}
                                />
                                <Input
                                    className={'mb--2'}
                                    handleChange={this.handleChange}
                                    label={'New Password'}
                                    name={'newPassword'}
                                    type={INPUT_TYPE_PASSWORD}
                                    value={newPassword}
                                />
                                <Input
                                    className={'mb--4'}
                                    handleChange={this.handleChange}
                                    label={'Verify New Password'}
                                    name={'newPasswordVerify'}
                                    type={INPUT_TYPE_PASSWORD}
                                    value={newPasswordVerify}
                                />
                                {
                                    !doPasswordsMatch
                                    && (
                                        <p className={`${displayName}__warning-message`}>
                                            {'Please ensure passwords match.'}
                                        </p>
                                    )
                                }
                                <Button
                                    isFullWidth
                                    label={'Update'}
                                    type={BUTTON_TYPE_SUBMIT}
                                />
                            </form>
                        </Card>
                    </GridItem>
                </Grid>
            </main>
        );
    }
}

UpdatePasswordView.displayName = 'UpdatePasswordView';

UpdatePasswordView.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

UpdatePasswordView.defaultProps = {
    history: {}
};

export default withRouter(UpdatePasswordView);
