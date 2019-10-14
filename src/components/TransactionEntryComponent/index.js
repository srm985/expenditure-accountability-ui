import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../IconComponent';

import classNames from '../../utils/classNames';
import formatCurrency from '../../utils/formatCurrency';

import {
    save
} from '../../assets/icons';

import './styles.scss';

export const TRANSACTION_TYPES = [
    'grocery',
    'personal',
    'shared'
];

class TransactionEntryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            transactionDate: '',
            transactionDescription: '',
            transactionTitle: '',
            transactionType: ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        const {
            rowData
        } = props;

        const clonedRowData = JSON.parse(JSON.stringify(rowData));

        const {
            transactionDate,
            transactionDescription,
            transactionTitle,
            transactionType,
            transactionValue
        } = clonedRowData;

        const {
            previousTransactionDate,
            previousTransactionDescription,
            previousTransactionTitle,
            previousTransactionType,
            previousTransactionValue
        } = state;

        if (transactionDate !== previousTransactionDate
            || transactionDescription !== previousTransactionDescription
            || transactionTitle !== previousTransactionTitle
            || transactionType !== previousTransactionType
            || transactionValue !== previousTransactionValue) {
            return ({
                transactionDate,
                transactionDescription,
                transactionTitle,
                transactionType,
                transactionValue
            });
        }

        return null;
    }

    toggleEditing = () => {
        this.setState((previousState) => {
            const {
                isEditing
            } = previousState;

            return ({
                isEditing: !isEditing
            });
        });
    }

    renderDate = () => {
        const {
            state: {
                transactionDate
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
            state: {
                transactionType
            }
        } = this;

        const {
            displayName
        } = TransactionEntryComponent;

        return (
            <div className={`${displayName}__type`}>
                <Icon icon={save} />
            </div>
        );
    }

    renderTitle = () => {
        const {
            state: {
                transactionTitle
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
            state: {
                transactionValue
            }
        } = this;

        const {
            displayName
        } = TransactionEntryComponent;

        return (
            <div className={`${displayName}__value`}>
                <span>{formatCurrency(transactionValue)}</span>
            </div>
        );
    }

    render() {
        const {
            props: {
                className
            }
        } = this;

        const {
            displayName
        } = TransactionEntryComponent;

        const componentClassNames = classNames(
            className,
            displayName
        );

        return (
            <li className={componentClassNames}>
                {this.renderDate()}
                {this.renderTransactionType()}
                {this.renderTitle()}
                {this.renderExpense()}
            </li>
        );
    }
}

TransactionEntryComponent.displayName = 'TransactionEntryComponent';

TransactionEntryComponent.propTypes = {
    className: PropTypes.string,
    deleteTransaction: PropTypes.func,
    rowData: PropTypes.shape({
        isEditable: PropTypes.bool,
        transactionDate: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        transactionDescription: PropTypes.string,
        transactionID: PropTypes.string,
        transactionTitle: PropTypes.string,
        transactionType: PropTypes.oneOf(TRANSACTION_TYPES).isRequired,
        transactionValue: PropTypes.number.isRequired
    }),
    updateTransaction: PropTypes.func
};

TransactionEntryComponent.defaultProps = {
    className: '',
    deleteTransaction: () => { },
    rowData: {},
    updateTransaction: () => { }
};

export default TransactionEntryComponent;
