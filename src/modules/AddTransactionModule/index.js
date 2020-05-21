import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../components/ButtonComponent';
import Input from '../../components/InputComponent';
import Modal from '../../components/ModalComponent';
import Select from '../../components/SelectComponent';

import {
    BUTTON_STYLE_TYPE_INLINE
} from '../../components/ButtonComponent/config';
import {
    INPUT_TYPE_DATE,
    INPUT_TYPE_TEL
} from '../../components/InputComponent/config';

import currency from '../../utils/currency';

import {
    TRANSACTION_TYPES,
    TRANSACTION_TYPE_LABELS,
    TRANSACTION_TYPE_PERSONAL
} from '../../constants';

class AddTransactionModule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalKey: Math.random(),
            transactionDate: moment().format('YYYY-MM-DD'),
            transactionDescription: '',
            transactionTitle: '',
            transactionTotalCost: '',
            transactionType: TRANSACTION_TYPE_PERSONAL
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

    handleClearFields = () => {
        this.setState({
            transactionTotalCost: ''
        });
    }

    handleChange = (event) => {
        const {
            target: {
                name,
                value
            }
        } = event;

        let formattedValue = value;

        if (name === 'transactionTotalCost') {
            formattedValue = currency.realTimeFormat(value);
        }

        this.setState({
            [name]: formattedValue
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
            transactionTotalCost: currency.unFormat(transactionTotalCost),
            transactionType
        });

        this.handleClearFields();
    }

    handleCancel = () => {
        const {
            props: {
                handleCancel
            }
        } = this;

        this.handleClearFields();

        handleCancel();
    }

    render() {
        const {
            props: {
                isAddingTransaction
            },
            state: {
                modalKey,
                transactionDate,
                transactionDescription,
                transactionTitle,
                transactionTotalCost,
                transactionType
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
                handleClickCTAPrimary={this.handleSubmit}
                handleClickCTASecondary={this.handleCancel}
                handleClose={this.handleCancel}
                isShown={isAddingTransaction}
                key={modalKey}
                labelCTAPrimary={'Submit'}
                labelCTASecondary={'Cancel'}
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
                    value={transactionTitle}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    label={'Description'}
                    name={'transactionDescription'}
                    placeholder={'transaction description'}
                    value={transactionDescription}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    isRequired
                    label={'Date'}
                    name={'transactionDate'}
                    placeholder={'transaction date'}
                    type={INPUT_TYPE_DATE}
                    value={transactionDate}
                />
                <Select
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    isRequired
                    label={'Type'}
                    name={'transactionType'}
                    options={transactionTypeOptions}
                    value={transactionType}
                />
                <Input
                    className={'mb--2'}
                    handleChange={this.handleChange}
                    isRequired
                    label={'Total Cost'}
                    name={'transactionTotalCost'}
                    placeholder={'transaction total cost'}
                    type={INPUT_TYPE_TEL}
                    value={transactionTotalCost}
                />
                <Button
                    className={'mb--4'}
                    href={'/bulk-entry'}
                    isAlignedRight
                    isInlineBlock
                    label={'Add bulk transactions'}
                    styleType={BUTTON_STYLE_TYPE_INLINE}
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
