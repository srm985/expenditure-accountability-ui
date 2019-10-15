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
            modalKey: Math.random(),
            transactionDate: '',
            transactionDescription: '',
            transactionTitle: '',
            transactionType: '',
            transactionValue: ''
        };
    }

    componentDidUpdate(previousProps) {
        const {
            props: {
                isAddingTransaction
            }
        } = this;

        const {
            isAddingTransaction: wasAddingTransaction
        } = previousProps;

        if (!isAddingTransaction && wasAddingTransaction) {
            this.setState({
                modalKey: Math.random()
            });
        }
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
                transactionDate,
                transactionDescription,
                transactionTitle,
                transactionType,
                transactionValue
            }
        } = this;

        handleSubmit({
            transactionDate,
            transactionDescription,
            transactionTitle,
            transactionType,
            transactionValue
        });
    }

    render() {
        const {
            props: {
                handleCancel,
                isAddingTransaction
            },
            state: {
                modalKey
            }
        } = this;

        return (
            <Modal
                handleClickCTASecondary={handleCancel}
                handleClose={handleCancel}
                isShown={isAddingTransaction}
                key={modalKey}
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
                    name={'transactionTitle'}
                    placeholder={'transaction title'}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    name={'transactionDescription'}
                    placeholder={'transaction description'}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    name={'transactionDate'}
                    placeholder={'transaction date'}
                    type={INPUT_TYPE_DATE}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    name={'transactionType'}
                    placeholder={'transaction type'}
                />
                <Input
                    className={'mb--4'}
                    handleChange={this.handleChange}
                    name={'transactionValue'}
                    placeholder={'transaction value'}
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
