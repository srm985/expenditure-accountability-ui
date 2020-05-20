import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import {
    TRANSACTION_TYPES,
    TRANSACTION_TYPE_GROCERY,
    TRANSACTION_TYPE_LABELS,
    TRANSACTION_TYPE_PERSONAL,
    TRANSACTION_TYPE_SHARED
} from '../../constants';
import Button from '../ButtonComponent';
import Icon from '../IconComponent';
import Input from '../InputComponent';
import Modal from '../ModalComponent';
import Select from '../SelectComponent';

import {
    BUTTON_STYLE_TYPE_SECONDARY,
    BUTTON_TYPE_SUBMIT
} from '../ButtonComponent/config';
import {
    INPUT_TYPE_DATE,
    INPUT_TYPE_TEL
} from '../InputComponent/config';

import classNames from '../../utils/classNames';
import currency from '../../utils/currency';

import {
    cart,
    personal,
    share,
    splitwise
} from '../../assets/icons';

import './styles.scss';

class TransactionEntryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formKey: Math.random(),
            isDrawerOpen: false,
            isModalShown: false
        };
    }

    toggleDrawer = () => {
        const {
            props: {
                rowData
            }
        } = this;

        const clonedRowData = JSON.parse(JSON.stringify(rowData));

        const {
            transactionDate,
            ...otherTransactionData
        } = clonedRowData;

        const transactionData = {
            ...otherTransactionData,
            transactionDate: moment(transactionDate).format('YYYY-MM-DD')
        };

        this.setState((previousState) => {
            const {
                formKey: previousFormKey,
                isDrawerOpen: wasDrawerOpen
            } = previousState;

            return ({
                formKey: !wasDrawerOpen ? Math.random() : previousFormKey,
                isDrawerOpen: !wasDrawerOpen,
                ...(!wasDrawerOpen ? transactionData : {})

            });
        });
    }

    toggleDeleteConfirmationModal = () => {
        this.setState((previousState) => {
            const {
                isModalShown
            } = previousState;

            return ({
                isModalShown: !isModalShown
            });
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

    handleSave = (event) => {
        const {
            props: {
                updateTransaction
            },
            state: {
                transactionDate,
                transactionDescription,
                transactionID,
                transactionTitle,
                transactionTotalCost,
                transactionType
            }
        } = this;

        event.preventDefault();

        updateTransaction({
            transactionDate,
            transactionDescription,
            transactionID,
            transactionTitle,
            transactionTotalCost: currency.unFormat(transactionTotalCost),
            transactionType
        });

        this.toggleDrawer();
    }

    handleDelete = () => {
        const {
            props: {
                deleteTransaction,
                rowData: {
                    transactionID
                }
            }
        } = this;

        this.toggleDeleteConfirmationModal();

        deleteTransaction(transactionID);

        this.toggleDrawer();
    }

    renderDate = () => {
        const {
            props: {
                rowData: {
                    transactionDate
                }
            }
        } = this;

        const {
            displayName
        } = TransactionEntryComponent;

        const date = moment(transactionDate).format('DD');
        const month = moment(transactionDate).format('MMM');
        const year = moment(transactionDate).format('YYYY');

        return (
            <div className={`${displayName}__date`}>
                <span>{date}</span>
                <span>{month}</span>
                <span>{year}</span>
            </div>
        );
    }

    renderTransactionType = () => {
        const {
            props: {
                rowData: {
                    isSplitwiseTransaction,
                    transactionType
                }
            }
        } = this;

        const {
            displayName
        } = TransactionEntryComponent;

        let icon;

        switch (transactionType) {
            case TRANSACTION_TYPE_GROCERY:
                icon = cart;
                break;

            case TRANSACTION_TYPE_PERSONAL:
                icon = personal;
                break;

            case TRANSACTION_TYPE_SHARED:
                icon = share;
                break;

            default:
                icon = '';
                break;
        }

        return (
            <div className={`${displayName}__type`}>
                <Icon icon={icon} />
                {
                    isSplitwiseTransaction
                    && (
                        <Icon icon={splitwise} />
                    )
                }
            </div>
        );
    }

    renderTitle = () => {
        const {
            props: {
                rowData: {
                    transactionTitle
                }
            }
        } = this;

        const {
            displayName
        } = TransactionEntryComponent;

        return (
            <div className={`${displayName}__title`}>
                <span>{transactionTitle}</span>
            </div>
        );
    }

    renderExpense = () => {
        const {
            props: {
                rowData: {
                    transactionSharedCost,
                    transactionTotalCost
                }
            }
        } = this;

        const {
            displayName
        } = TransactionEntryComponent;

        return (
            <>
                <div className={`${displayName}__shared-cost`}>
                    <span>{'Your Cost'}</span>
                    <span>{currency.format(transactionSharedCost)}</span>
                </div>
                <div className={`${displayName}__total-cost`}>
                    <span>{'Total Cost'}</span>
                    <span>{currency.format(transactionTotalCost)}</span>
                </div>
            </>
        );
    }

    renderDrawer = () => {
        const {
            props: {
                isLastEntry,
                rowData: {
                    isEditable
                }
            },
            state: {
                formKey,
                isDrawerOpen,
                transactionDate,
                transactionDescription,
                transactionTitle,
                transactionTotalCost,
                transactionType
            }
        } = this;

        const {
            displayName
        } = TransactionEntryComponent;

        const transactionTypeOptions = TRANSACTION_TYPES.map((transactionTypeOption) => {
            const {
                [transactionTypeOption]: label
            } = TRANSACTION_TYPE_LABELS;

            return ({
                label,
                value: transactionTypeOption
            });
        });

        const drawerClassNames = classNames(
            `${displayName}__drawer`,
            {
                [`${displayName}__drawer--last`]: isLastEntry,
                [`${displayName}__drawer--open`]: isDrawerOpen
            }
        );

        return (
            <div className={drawerClassNames}>
                {
                    isEditable
                    && (
                        <form
                            key={formKey}
                            onSubmit={this.handleSave}
                        >
                            <Input
                                className={'mb--2'}
                                defaultValue={transactionTitle}
                                handleChange={this.handleChange}
                                isRequired
                                label={'Title'}
                                name={'transactionTitle'}
                                placeholder={'transaction title'}
                            />
                            <Input
                                className={'mb--2'}
                                defaultValue={transactionDescription}
                                handleChange={this.handleChange}
                                label={'Description'}
                                name={'transactionDescription'}
                                placeholder={'transaction description'}
                            />
                            <Input
                                className={'mb--2'}
                                defaultValue={transactionDate}
                                handleChange={this.handleChange}
                                isRequired
                                label={'Date'}
                                name={'transactionDate'}
                                placeholder={'transaction date'}
                                type={INPUT_TYPE_DATE}
                            />
                            <Select
                                className={'mb--2'}
                                defaultValue={transactionType}
                                handleChange={this.handleChange}
                                isRequired
                                label={'Type'}
                                name={'transactionType'}
                                options={transactionTypeOptions}
                            />
                            <Input
                                className={'mb--4'}
                                defaultValue={transactionTotalCost}
                                handleChange={this.handleChange}
                                isRequired
                                label={'Total Cost'}
                                name={'transactionTotalCost'}
                                placeholder={'transaction total cost'}
                                type={INPUT_TYPE_TEL}
                                value={transactionTotalCost}
                            />
                            <div className={`${displayName}__drawer-buttons`}>
                                <Button
                                    className={'mr--2'}
                                    label={'Save'}
                                    type={BUTTON_TYPE_SUBMIT}
                                />
                                <Button
                                    handleClick={this.toggleDeleteConfirmationModal}
                                    isWarning
                                    label={'Delete'}
                                    styleType={BUTTON_STYLE_TYPE_SECONDARY}
                                />
                            </div>
                        </form>
                    )
                }
            </div>
        );
    }

    render() {
        const {
            props: {
                className,
                rowData: {
                    isEditable
                }
            },
            state: {
                isDrawerOpen,
                isModalShown
            }
        } = this;

        const {
            displayName
        } = TransactionEntryComponent;

        const componentClassNames = classNames(
            className,
            displayName,
            {
                [`${displayName}--open`]: isDrawerOpen
            }
        );

        const rowClassNames = classNames(
            `${displayName}__row`,
            {
                [`${displayName}__row--editable`]: isEditable,
                [`${displayName}__row--open`]: isDrawerOpen
            }
        );

        return (
            <>
                <li className={componentClassNames}>
                    <div
                        className={rowClassNames}
                        onClick={isEditable ? this.toggleDrawer : () => { }}
                    >
                        {this.renderDate()}
                        {this.renderTransactionType()}
                        {this.renderTitle()}
                        {this.renderExpense()}
                    </div>
                    {this.renderDrawer()}
                </li>
                <Modal
                    handleClickCTAPrimary={this.handleDelete}
                    handleClickCTASecondary={this.toggleDeleteConfirmationModal}
                    handleClose={this.toggleDeleteConfirmationModal}
                    isShown={isModalShown}
                    isWarningCTAPrimary
                    labelCTAPrimary={'Delete'}
                    labelCTASecondary={'Cancel'}
                >
                    <h2 className={'mb--2'}>
                        {'Delete Transaction'}
                    </h2>
                    <p>
                        {'Are you sure you wish to delete this transaction?'}
                    </p>
                </Modal>
            </>
        );
    }
}

TransactionEntryComponent.displayName = 'TransactionEntryComponent';

TransactionEntryComponent.propTypes = {
    className: PropTypes.string,
    deleteTransaction: PropTypes.func,
    isLastEntry: PropTypes.bool,
    rowData: PropTypes.shape({
        isEditable: PropTypes.bool,
        isSplitwiseTransaction: PropTypes.bool,
        transactionDate: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        transactionDescription: PropTypes.string,
        transactionID: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        transactionSharedCost: PropTypes.number.isRequired,
        transactionTitle: PropTypes.string,
        transactionTotalCost: PropTypes.number.isRequired,
        transactionType: PropTypes.oneOf(TRANSACTION_TYPES).isRequired
    }),
    updateTransaction: PropTypes.func
};

TransactionEntryComponent.defaultProps = {
    className: '',
    deleteTransaction: () => { },
    isLastEntry: true,
    rowData: {},
    updateTransaction: () => { }
};

export default TransactionEntryComponent;
