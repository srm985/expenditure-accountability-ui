import PropTypes from 'prop-types';
import React from 'react';

import Input from '../../components/InputComponent';
import Modal from '../../components/ModalComponent';
import Select from '../../components/SelectComponent';

import {
    INPUT_TYPE_DATE,
    INPUT_TYPE_TEL
} from '../../components/InputComponent/config';

import {
    TRANSACTION_TYPE_LABELS,
    TRANSACTION_TYPES
} from '../../constants';

class AddTransactionModule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalKey: Math.random(),
            transactionDate: '',
            transactionDescription: '',
            transactionTitle: '',
            transactionTotalCost: '',
            transactionType: ''
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
                transactionTotalCost,
                transactionType
            }
        } = this;

        handleSubmit({
            transactionDate,
            transactionDescription,
            transactionTitle,
            transactionTotalCost,
            transactionType
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

        const transactionTypeOptions = TRANSACTION_TYPES.map((transactionTypeOption) => {
            const {
                [transactionTypeOption]: label
            } = TRANSACTION_TYPE_LABELS;

            return ({
                label,
                value: transactionTypeOption
            });
        });

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
                    isRequired
                    label={'Title'}
                    name={'transactionTitle'}
                    placeholder={'transaction title'}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    label={'Description'}
                    name={'transactionDescription'}
                    placeholder={'transaction description'}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    isRequired
                    label={'Date'}
                    name={'transactionDate'}
                    placeholder={'transaction date'}
                    type={INPUT_TYPE_DATE}
                />
                <Select
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    isRequired
                    label={'Type'}
                    name={'transactionType'}
                    options={transactionTypeOptions}
                />
                <Input
                    className={'mb--4'}
                    handleChange={this.handleChange}
                    isRequired
                    label={'Total Cost'}
                    name={'transactionTotalCost'}
                    placeholder={'transaction total cost'}
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
