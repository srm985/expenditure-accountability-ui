import PropTypes from 'prop-types';
import React from 'react';

import Input from '../../components/InputComponent';
import Modal from '../../components/ModalComponent';

import {
    INPUT_TYPE_DATE,
    INPUT_TYPE_TEL
} from '../../components/InputComponent/config';

class AddTransactionModule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            groceryExpense: '',
            personalExpense: '',
            sharedExpense: ''
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
                handleSubmit
            },
            state: {
                date,
                groceryExpense,
                personalExpense,
                sharedExpense
            }
        } = this;

        handleSubmit({
            date,
            groceryExpense,
            personalExpense,
            sharedExpense
        });
    }

    render() {
        const {
            props: {
                handleCancel,
                isAddingTransaction
            }
        } = this;

        return (
            <Modal
                handleClickCTASecondary={handleCancel}
                handleClose={handleCancel}
                isShown={isAddingTransaction}
                labelCTAPrimary={'Submit'}
                labelCTASecondary={'Cancel'}
                handleClickCTAPrimary={this.handleSubmit}
            >
                <h2 className={'mb--2'}>
                    {'Add Transaction'}
                </h2>
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    name={'date'}
                    placeholder={'date'}
                    type={INPUT_TYPE_DATE}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    name={'personalExpense'}
                    placeholder={'personal expense'}
                    type={INPUT_TYPE_TEL}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    name={'sharedExpense'}
                    placeholder={'shared expense'}
                    type={INPUT_TYPE_TEL}
                />
                <Input
                    className={'mb--4'}
                    handleChange={this.handleChange}
                    name={'groceryExpense'}
                    placeholder={'grocery expense'}
                    type={INPUT_TYPE_TEL}
                />
            </Modal>
        );
    }
}

AddTransactionModule.propTypes = {
    handleCancel: PropTypes.func,
    handleSubmit: PropTypes.func,
    isAddingTransaction: PropTypes.bool
};

AddTransactionModule.defaultProps = {
    handleCancel: () => { },
    handleSubmit: () => { },
    isAddingTransaction: false
};

export default AddTransactionModule;
