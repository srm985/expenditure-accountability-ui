import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../IconComponent';
import Input from '../InputComponent';
import Popover from '../PopoverComponent';

import {
    save
} from '../../assets/icons';

import './styles.scss';

class TableRowComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            groceryExpense: '',
            isEditing: false,
            personalExpense: '',
            sharedExpense: ''
        };
    }

    componentDidMount() {
        const {
            props: {
                rowData: {
                    date,
                    groceryExpense,
                    personalExpense,
                    sharedExpense
                }
            }
        } = this;

        this.setState({
            date,
            groceryExpense,
            personalExpense,
            sharedExpense
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

    handleSave = () => {
        const {
            props: {
                rowData: {
                    transactionID
                },
                updateTransaction
            },
            state: {
                date,
                groceryExpense,
                personalExpense,
                sharedExpense
            }
        } = this;

        updateTransaction({
            date: moment(date).toISOString(),
            groceryExpense: parseFloat(groceryExpense.replace('$', '')),
            personalExpense: parseFloat(personalExpense.replace('$', '')),
            sharedExpense: parseFloat(sharedExpense.replace('$', '')),
            transactionID
        });

        this.toggleEditing();
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

    render() {
        const {
            props: {
                deleteTransaction,
                rowData: {
                    isEditable,
                    transactionID,
                    ...otherRowData
                }
            },
            state: {
                isEditing
            }
        } = this;

        const {
            displayName
        } = TableRowComponent;

        const clonedRowData = JSON.parse(JSON.stringify(otherRowData));

        const cells = Object.keys(clonedRowData).map((cellName) => {
            const {
                [cellName]: cellValue
            } = clonedRowData;

            return (
                <span
                    className={`${displayName}__cell`}
                    key={cellName}
                >
                    {
                        isEditing
                            ? (
                                <Input
                                    defaultValue={cellValue}
                                    handleChange={this.handleChange}
                                    name={cellName}
                                />
                            )
                            : (
                                <span>
                                    {cellValue}
                                </span>
                            )
                    }
                </span>
            );
        });

        return (
            <li className={displayName}>
                {cells}
                {
                    isEditable
                    && (
                        <div className={`${displayName}__edit-button`}>
                            {
                                isEditing
                                    ? (
                                        <Icon
                                            icon={save}
                                            handleClick={this.handleSave}
                                        />
                                    )
                                    : (
                                        <Popover
                                            optionsList={
                                                [
                                                    {
                                                        action: this.toggleEditing,
                                                        label: 'edit'
                                                    },
                                                    {
                                                        action: () => deleteTransaction(transactionID),
                                                        label: 'delete'
                                                    }
                                                ]
                                            }
                                        />
                                    )
                            }
                        </div>
                    )
                }
            </li>
        );
    }
}

TableRowComponent.displayName = 'TableRowComponent';

TableRowComponent.propTypes = {
    deleteTransaction: PropTypes.func,
    rowData: PropTypes.shape({
        date: PropTypes.string,
        groceryExpense: PropTypes.number,
        isEditable: PropTypes.bool,
        personalExpense: PropTypes.number,
        sharedExpense: PropTypes.number,
        transactionID: PropTypes.string
    }),
    updateTransaction: PropTypes.func
};

TableRowComponent.defaultProps = {
    deleteTransaction: () => { },
    rowData: {},
    updateTransaction: () => { }
};

export default TableRowComponent;
