import PropTypes from 'prop-types';
import React from 'react';

import Input from '../InputComponent';
import Popover from '../PopoverComponent';

import './styles.scss';

class TableRowComponent extends React.Component {
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

    render() {
        const {
            props: {
                currentlyEditingTransactionID,
                handleClickEdit,
                rowData: {
                    isEditable,
                    transactionID,
                    ...otherRowData
                }
            }
        } = this;

        const {
            displayName
        } = TableRowComponent;

        const isEditing = transactionID === currentlyEditingTransactionID;

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
                        <Popover
                            optionsList={
                                [
                                    {
                                        action: () => handleClickEdit(transactionID),
                                        label: 'edit'
                                    },
                                    {
                                        action: () => { },
                                        label: 'delete'
                                    }
                                ]
                            }
                        />
                    )
                }
            </li>
        );
    }
}

TableRowComponent.displayName = 'TableRowComponent';

TableRowComponent.propTypes = {
    currentlyEditingTransactionID: PropTypes.string,
    handleClickEdit: PropTypes.func,
    rowData: PropTypes.shape({
        isEditable: PropTypes.bool,
        transactionID: PropTypes.string
    })
};

TableRowComponent.defaultProps = {
    currentlyEditingTransactionID: '',
    handleClickEdit: () => { },
    rowData: {}
};

export default TableRowComponent;
