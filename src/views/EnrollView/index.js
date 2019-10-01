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
    INPUT_TYPE_EMAIL,
    INPUT_TYPE_PASSWORD
} from '../../components/InputComponent/config';

import makeCall, {
    CALL_TYPE_PUT
} from '../../utils/restful';

class EnrollView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
            firstName: '',
            lastName: '',
            password: ''
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

    handleSubmit = () => {
        const {
            props: {
                history
            },
            state: {
                emailAddress,
                firstName,
                lastName,
                password
            }
        } = this;

        makeCall({
            method: CALL_TYPE_PUT,
            payload: {
                emailAddress,
                firstName,
                lastName,
                password
            },
            URL: '/api/enroll'
        }).then(() => {
            history.push('/');
        }).catch(() => {
            // Not going to handle invalid enrollment.
        });
    }

    render() {
        const {
            state: {
                emailAddress,
                firstName,
                lastName,
                password
            }
        } = this;

        const {
            displayName
        } = EnrollView;

        return (
            <div className={displayName}>
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
                            <form onSubmit={this.handleSubmit}>
                                <Input
                                    className={'mb--2'}
                                    handleChange={this.handleChange}
                                    label={'First Name'}
                                    name={'firstName'}
                                    value={firstName}
                                />
                                <Input
                                    className={'mb--2'}
                                    handleChange={this.handleChange}
                                    label={'Last Name'}
                                    name={'lastName'}
                                    value={lastName}
                                />
                                <Input
                                    className={'mb--2'}
                                    handleChange={this.handleChange}
                                    label={'Email Address'}
                                    name={'emailAddress'}
                                    type={INPUT_TYPE_EMAIL}
                                    value={emailAddress}
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
                                    label={'Enroll'}
                                    type={BUTTON_TYPE_SUBMIT}
                                />
                            </form>
                        </Card>
                    </GridItem>
                </Grid>
            </div>
        );
    }
}

EnrollView.displayName = 'EnrollView';

EnrollView.propTypes = {
    history: PropTypes.func
};

EnrollView.defaultProps = {
    history: () => { }
};

export default withRouter(EnrollView);
